import { prisma } from '@/lib/prisma';
import { addMinutes, startOfDay, endOfDay, isBefore, isAfter, parse, format, isEqual, differenceInMinutes } from 'date-fns';

/**
 * Returns available start times for a given practice and date.
 * Accounts for 1-4 chair constraint.
 */
export async function getAvailableSlots(practiceId: string, dateStr: string) {
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();
  const appointmentDuration = 60; // Standard 60-min appointment for simplicity

  const practice = await prisma.practice.findUnique({
    where: { id: practiceId },
    include: { slots: true }
  });

  if (!practice) throw new Error('Practice not found');

  const activeSlotTemplate = practice.slots.find(s => s.dayOfWeek === dayOfWeek && s.isActive);
  if (!activeSlotTemplate) return [];

  // Define operational boundaries for the day
  const [startHour, startMin] = activeSlotTemplate.startTime.split(':').map(Number);
  const [endHour, endMin] = activeSlotTemplate.endTime.split(':').map(Number);
  
  const dayStartTime = startOfDay(date);
  dayStartTime.setHours(startHour, startMin, 0, 0);
  
  const dayEndTime = startOfDay(date);
  dayEndTime.setHours(endHour, endMin, 0, 0);

  // Fetch all existing appointments for the practice on this day
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      patient: { practiceId },
      startTime: { gte: startOfDay(date) },
      endTime: { lte: endOfDay(date) },
      status: { not: 'CANCELLED' }
    }
  });

  const availableSlots: Date[] = [];
  let currentSlotStart = dayStartTime;

  while (isBefore(addMinutes(currentSlotStart, appointmentDuration), dayEndTime) || isEqual(addMinutes(currentSlotStart, appointmentDuration), dayEndTime)) {
    const currentSlotEnd = addMinutes(currentSlotStart, appointmentDuration);
    
    // Check chair occupancy for this specific window
    // An appointment overlaps if it starts before currentSlotEnd AND ends after currentSlotStart
    const overlappingCount = existingAppointments.filter(app => {
      return isBefore(app.startTime, currentSlotEnd) && isAfter(app.endTime, currentSlotStart);
    }).length;

    if (overlappingCount < practice.chairsCount) {
      availableSlots.push(new Date(currentSlotStart));
    }
    
    // Increment by 30 mins to allow flexible start times
    currentSlotStart = addMinutes(currentSlotStart, 30);
  }

  return availableSlots;
}

/**
 * Books an appointment after verifying availability.
 * Uses a transaction to prevent overbooking chairs.
 */
export async function bookAppointment(data: {
  patientId: string;
  practiceId: string;
  startTime: Date;
  durationMinutes?: number;
}) {
  const { patientId, practiceId, startTime, durationMinutes = 60 } = data;
  const endTime = addMinutes(startTime, durationMinutes);

  return await prisma.$transaction(async (tx) => {
    const practice = await tx.practice.findUnique({
      where: { id: practiceId }
    });

    if (!practice) throw new Error('Practice not found');

    // Check availability again within the transaction
    const overlappingCount = await tx.appointment.count({
      where: {
        patient: { practiceId },
        status: { not: 'CANCELLED' },
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } }
        ]
      }
    });

    if (overlappingCount >= practice.chairsCount) {
      throw new Error('No chairs available for the selected time slot.');
    }

    // Assign a chair ID based on availability (1, 2, 3, or 4)
    // For simplicity in this logic, we just check which index is free
    const currentAppointments = await tx.appointment.findMany({
      where: {
        patient: { practiceId },
        status: { not: 'CANCELLED' },
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } }
        ]
      },
      select: { chairId: true }
    });

    const busyChairIds = new Set(currentAppointments.map(a => a.chairId));
    let assignedChairId = "1";
    for (let i = 1; i <= practice.chairsCount; i++) {
      if (!busyChairIds.has(i.toString())) {
        assignedChairId = i.toString();
        break;
      }
    }

    const appointment = await tx.appointment.create({
      data: {
        startTime,
        endTime,
        chairId: assignedChairId,
        patientId,
        status: 'BOOKED',
        preAuthStatus: 'NONE'
      }
    });

    return appointment;
  });
}
