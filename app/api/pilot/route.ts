import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const required = ['practiceName', 'email', 'chairs', 'software', 'painPoints'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // Forward to Baget Database
    // Note: The database website_leads will be created via tool
    const response = await fetch('https://app.baget.ai/api/public/databases/website_leads/rows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Database submission error:', errorText);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('API Pilot error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
