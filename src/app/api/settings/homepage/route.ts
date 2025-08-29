import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { HomepageSettingsModel } from "@/models/HomepageSettings";
import { requireRole } from "@/lib/auth-helpers";

export async function GET() {
  await connectToDatabase();
  const settings = await HomepageSettingsModel.findOne().lean();
  if (!settings) {
    // Return default settings if none exist
    return NextResponse.json({
      welcome: { title: 'Welcome Home', content: 'At PGMI Church, we believe...' },
      callToAction: {
        title: 'Join Us This Sunday',
        content: 'Experience the love of Christ...',
        button1: { text: 'Get in Touch', link: '/contact' },
        button2: { text: 'View Events', link: '/events' },
      }
    });
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  try {
    await requireRole(req, ['admin', 'editor']);
    await connectToDatabase();
    const data = await req.json();

    // For simplicity, we'll just have one document for these settings
    const updatedSettings = await HomepageSettingsModel.findOneAndUpdate(
      {},
      data,
      { upsert: true, new: true }
    );

    return NextResponse.json(updatedSettings);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
