import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { SermonModel } from "@/models/Sermon";

interface SessionUser {
  role?: string;
  isMainAdmin?: boolean;
}

interface Session {
  user?: SessionUser;
}

function hasAccess(session: Session | null): boolean {
  return Boolean(session?.user?.isMainAdmin || session?.user?.role === "admin" || session?.user?.role === "editor");
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const series = searchParams.get("series");
  const limit = searchParams.get("limit");

  const query: Record<string, unknown> = {};


  if (category) {
    query.category = category;
  }

  if (series) {
    query.series = series;
  }

  let sermonsQuery = SermonModel.find(query).sort({ date: -1 });

  if (limit) {
    const limitNum = parseInt(limit);
    if (!isNaN(limitNum)) {
      sermonsQuery = sermonsQuery.limit(limitNum);
    }
  }

  const sermons = await sermonsQuery.lean();
  return NextResponse.json({ sermons });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!hasAccess(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const body = await req.json();

  if (!body.title || !body.preacher || !body.date) {
    return NextResponse.json(
      { error: "Title, preacher, and date are required" },
      { status: 400 }
    );
  }

  try {
    const created = await SermonModel.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Sermon creation error:", error);
    return NextResponse.json(
      { error: "Failed to create sermon" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!hasAccess(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const body = await req.json();
  const { _id, action, liveStreamUrl } = body as { _id?: string; action?: "go-live" | "end-live"; liveStreamUrl?: string };

  if (action === "go-live") {
    if (!_id) return NextResponse.json({ error: "Missing sermon id" }, { status: 400 });
    const sermon = await SermonModel.findById(_id);
    if (!sermon) return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    if (!sermon.title || !sermon.preacher || !(sermon.videoUrl || liveStreamUrl)) {
      return NextResponse.json({ error: "Missing required fields to go live" }, { status: 400 });
    }
    sermon.isLive = true;
    if (liveStreamUrl) sermon.liveStreamUrl = liveStreamUrl;
    await sermon.save();
    return NextResponse.json({ ok: true });
  }

  if (action === "end-live") {
    const live = await SermonModel.findOne({ isLive: true }).sort({ date: -1 });
    if (!live) return NextResponse.json({ message: "No live sermon" });
    live.isLive = false;
    live.isLatest = true;
    await live.save();
    await SermonModel.updateMany({ _id: { $ne: live._id } }, { $set: { isLatest: false } });
    return NextResponse.json({ ok: true });
  }

  // Default: update sermon fields
		interface Body {
		_id?: string;
		name?: string;
		// add other fields...
	}

	const { _id: id, ...rest }: Body & { _id?: string } = body;

  if (!id) return NextResponse.json({ error: "Missing sermon id" }, { status: 400 });
  const updated = await SermonModel.findByIdAndUpdate(id, rest, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!hasAccess(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing sermon ID" }, { status: 400 });
  }

  try {
    const deleted = await SermonModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Sermon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sermon deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete sermon" },
      { status: 500 }
    );
  }
}
