import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SermonModel } from "@/models/Sermon";
import { requireRole } from "@/lib/auth-helpers";

export async function GET() {
	await connectToDatabase();
	const items = await SermonModel.find().sort({ date: -1 }).lean();
	return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    await requireRole(req, ['admin', 'editor', 'pastor']);
    await connectToDatabase();
    const data = await req.json();
    const created = await SermonModel.create(data);
    // If marked latest, unset others
    if (created.isLatest) {
      await SermonModel.updateMany({ _id: { $ne: created._id } }, { $set: { isLatest: false, isLive: false } });
    }
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
    const updated = await SermonModel.findByIdAndUpdate(_id, rest, { new: true });
    if (rest.isLatest) {
      await SermonModel.updateMany({ _id: { $ne: updated?._id } }, { $set: { isLatest: false, isLive: false } });
    }
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
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const deleted = await SermonModel.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Sermon not found' }, { status: 404 });

    return NextResponse.json({ message: 'Sermon deleted successfully' });
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


