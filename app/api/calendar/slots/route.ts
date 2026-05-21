import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/actions/calendar';

/**
 * @api {get} /api/calendar/slots Get Available Slots
 * @apiDescription Returns list of available ISO date strings for a specific practice and date.
 * @query {string} practiceId
 * @query {string} date (YYYY-MM-DD)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const practiceId = searchParams.get('practiceId');
  const dateStr = searchParams.get('date');

  if (!practiceId || !dateStr) {
    return NextResponse.json(
      { error: 'Missing practiceId or date parameter' },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(practiceId, dateStr);
    return NextResponse.json({ data: slots });
  } catch (error: any) {
    console.error('Fetch slots error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch slots', message: error.message },
      { status: 500 }
    );
  }
}
