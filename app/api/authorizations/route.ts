import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @api {post} /api/authorizations Initiate Authorization
 * @apiDescription Starts a new insurance authorization track for an appointment.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appointmentId, procedureCode, payerId } = body;

    if (!appointmentId || !procedureCode || !payerId) {
      return NextResponse.json(
        { error: 'Missing required fields: appointmentId, procedureCode, payerId' },
        { status: 400 }
      );
    }

    const authorization = await prisma.insuranceAuthorization.create({
      data: {
        appointmentId,
        procedureCode,
        payerId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ data: authorization }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @api {patch} /api/authorizations Update Status
 * @apiDescription Updates authorization status (e.g., when FHIR webhook triggers).
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and Status are required' }, { status: 400 });
    }

    const authorization = await prisma.insuranceAuthorization.update({
      where: { id },
      data: {
        status,
        notes,
        responseDate: ['APPROVED', 'DENIED'].includes(status) ? new Date() : undefined,
      },
    });

    return NextResponse.json({ data: authorization });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @api {get} /api/authorizations Track Status
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appointmentId = searchParams.get('appointmentId');

  if (!appointmentId) {
    return NextResponse.json({ error: 'appointmentId is required' }, { status: 400 });
  }

  try {
    const auth = await prisma.insuranceAuthorization.findUnique({
      where: { appointmentId },
      include: {
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!auth) {
      return NextResponse.json({ error: 'Authorization not found' }, { status: 404 });
    }

    return NextResponse.json({ data: auth });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
