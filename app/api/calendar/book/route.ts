import { NextResponse } from 'next/server';
import { bookAppointment } from '@/lib/actions/calendar';

/**
 * @api {post} /api/calendar/book Create Booking
 * @apiDescription Records a new patient appointment after validating chair availability.
 * @body {string} patientId
 * @body {string} practiceId
 * @body {string} startTime (ISO string)
 * @body {number} [duration] (Minutes, default 60)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, practiceId, startTime, duration } = body;

    if (!patientId || !practiceId || !startTime) {
      return NextResponse.json(
        { error: 'Missing required fields: patientId, practiceId, startTime' },
        { status: 400 }
      );
    }

    const appointment = await bookAppointment({
      patientId,
      practiceId,
      startTime: new Date(startTime),
      durationMinutes: duration || 60,
    });

    return NextResponse.json({ 
      success: true, 
      data: appointment 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Booking error:', error);
    
    // Handle specific availability errors
    if (error.message.includes('No chairs available')) {
      return NextResponse.json(
        { error: 'Unavailable', message: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
