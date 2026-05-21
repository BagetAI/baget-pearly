'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateInsuranceStatus(authId: string, status: string, notes?: string) {
  try {
    const updatedAuth = await prisma.insuranceAuthorization.update({
      where: { id: authId },
      data: {
        status,
        notes,
        responseDate: ['APPROVED', 'DENIED'].includes(status) ? new Date() : undefined,
      },
      include: {
        appointment: true,
      },
    });

    // Mirror the status to the Appointment's pre_auth_status field
    await prisma.appointment.update({
      where: { id: updatedAuth.appointmentId },
      data: {
        preAuthStatus: status,
      },
    });

    revalidatePath('/');
    return { success: true, data: updatedAuth };
  } catch (error: any) {
    console.error('Failed to update insurance status:', error);
    return { success: false, error: error.message };
  }
}
