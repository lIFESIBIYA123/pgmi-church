import { connectToDatabase } from "@/lib/db";
import { EventModel } from "@/models/Event";
import { requireRole } from "@/lib/auth-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const now = new Date();
  const allEvents = await EventModel.find().sort({ date: 1 }).lean();

  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
  const pastEvents = allEvents.filter(event => new Date(event.date) < now);

  return NextResponse.json({ upcomingEvents, pastEvents });
}

export async function POST(req: NextRequest) {
  try {
    await requireRole(req, ['admin', 'editor', 'pastor']);
    await connectToDatabase();
    const data = await req.json();
    const created = await EventModel.create(data);
    return NextResponse.json(created, { status: 201 });
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

export async function PUT(req: NextRequest) {
  try {
    await requireRole(req, ['admin', 'editor', 'pastor']);
    await connectToDatabase();
    const data = await req.json();
    const { _id, ...rest } = data;
    const updated = await EventModel.findByIdAndUpdate(_id, rest, { new: true });
    return NextResponse.json(updated);
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

export async function DELETE(req: NextRequest) {
  try {
    await requireRole(req, ['admin', 'editor', 'pastor']);
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const deleted = await EventModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' });
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
