import { connectToDatabase } from "@/lib/db";
import { EventModel } from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface EventQuery {
  isActive: boolean;
  category?: string;
  date?: { $gte?: Date; $lt?: Date };
}

// Custom session type to include our custom properties
interface CustomSession {
  user?: {
    id: string;
    role: string;
    isMainAdmin?: boolean;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// Helper function to check if user has access
function hasAccess(session: CustomSession | null): boolean {
  return Boolean(
    session?.user?.isMainAdmin ||
    session?.user?.role === "admin" ||
    session?.user?.role === "editor"
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get("upcoming");
    const past = searchParams.get("past");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    const query: EventQuery = { isActive: true };
    let sort: Record<string, 1 | -1> = { date: 1 }; // Default sort by date ascending

    if (category) {
      query.category = category;
    }

    if (upcoming === "true") {
      // Get upcoming events only
      const now = new Date();
      query.date = { $gte: now };
      sort = { date: 1 }; // Sort by date ascending (earliest first)
    } else if (past === "true") {
      // Get past events only
      const now = new Date();
      query.date = { $lt: now };
      sort = { date: -1 }; // Sort by date descending (most recent first)
    }

    let eventsQuery = EventModel.find(query).sort(sort);

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        eventsQuery = eventsQuery.limit(limitNum);
      }
    }

    const events = await eventsQuery.lean();
    return NextResponse.json({ events });

  } catch (error) {
    console.error('Error in GET /events:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch events',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const session = await getServerSession(authOptions) as CustomSession | null;

  if (!hasAccess(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.title || !data.date) {
      return NextResponse.json(
        { error: "Title and Date are required fields" },
        { status: 400 }
      );
    }

    const created = await EventModel.create(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error occurred while creating the event", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest): Promise<Response> {
  const session = await getServerSession(authOptions) as CustomSession | null;

  if (!hasAccess(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    const data = await req.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json({ error: 'Missing _id' }, { status: 400 });
    }

    const updated = await EventModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error occurred while updating the event", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const session = await getServerSession(authOptions) as CustomSession | null;

  if (!hasAccess(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error occurred while deleting the event", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
