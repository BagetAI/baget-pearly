import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * @api {post} /api/patients Patient Intake
 * @apiDescription Creates a new patient record in the practice.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, dob, practiceId } = body;

    // Validation
    if (!firstName || !lastName || !phone || !practiceId) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, phone, practiceId' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dob: new Date(dob),
        practiceId,
      },
    });

    return NextResponse.json({ data: patient }, { status: 201 });
  } catch (error: any) {
    console.error('Patient intake error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * @api {get} /api/patients Get Patients
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const practiceId = searchParams.get('practiceId');

  if (!practiceId) {
    return NextResponse.json({ error: 'practiceId is required' }, { status: 400 });
  }

  try {
    const patients = await prisma.patient.findMany({
      where: { practiceId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: patients });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
