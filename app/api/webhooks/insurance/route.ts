import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @api {post} /api/webhooks/insurance Webhook Receiver
 * @apiDescription Handles status updates from simulated insurance payers (FHIR/ePA).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authId, status, notes, secret } = body;

    // Simulation verification
    if (process.env.PEARLY_WEBHOOK_SECRET && secret !== process.env.PEARLY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!authId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: authId, status' },
        { status: 400 }
      );
    }

    // Update Authorization and mirror status to Appointment
    const authorization = await prisma.insuranceAuthorization.update({
      where: { id: authId },
      data: {
        status,
        notes,
        responseDate: ['APPROVED', 'DENIED'].includes(status) ? new Date() : new Date(),
        appointment: {
          update: {
            preAuthStatus: status,
          },
        },
      },
    });

    return NextResponse.json({
      received: true,
      updatedStatus: authorization.status,
      appointmentId: authorization.appointmentId,
    });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
