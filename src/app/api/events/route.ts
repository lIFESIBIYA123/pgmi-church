import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { EventModel } from "@/models/Event";

interface ExtendedUser {
  id: string;
  role: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isMainAdmin?: boolean;
}

interface ExtendedSession {
  user?: ExtendedUser;
}

function hasAccess(session: ExtendedSession | null): boolean {
  return Boolean(session?.user?.isMainAdmin || session?.user?.role === "admin" || session?.user?.role === "editor");
}

interface EventQuery {
  isActive: boolean;
  category?: string;
  date?: {
    $gte?: Date;
    $lt?: Date;
  };
}

interface EventSort {
  [key: string]: 1 | -1;
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const upcoming = searchParams.get("upcoming");
  const past = searchParams.get("past");
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  const query: EventQuery = { isActive: true };
  let sort: EventSort = { date: 1 }; // Default sort by date ascending

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
    const limitNum = parseInt(limit);
    if (!isNaN(limitNum)) {
      eventsQuery = eventsQuery.limit(limitNum);
    }
  }

  const events = await eventsQuery.lean();
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const session = (await getServerSession(authOptions)) as ExtendedSession;

  if (!hasAccess(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const body = await req.json();

  if (!body.title || !body.date) {
    return NextResponse.json(
      { error: "Title and date are required" },
      { status: 400 }
    );
  }

  try {
    const created = await EventModel.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = (await getServerSession(authOptions)) as ExtendedSession;

  if (!hasAccess(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const body = await req.json();
  const { _id, ...updateData } = body;

  if (!_id) {
    return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
  }

  try {
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
    console.error("Event update error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = (await getServerSession(authOptions)) as ExtendedSession;

  if (!hasAccess(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
  }

  try {
    const deleted = await EventModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Event deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
