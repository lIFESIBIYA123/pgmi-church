import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PrayerRequestModel } from "@/models/PrayerRequest";
import { requireRole } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  try {
    await requireRole(req, ['pastor']);
    await connectToDatabase();
    const items = await PrayerRequestModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(items);
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

export async function POST(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const created = await PrayerRequestModel.create(data);
	return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  try {
    await requireRole(req, ['pastor']);
    await connectToDatabase();
    const data = await req.json();
    const { _id, ...rest } = data;
    const updated = await PrayerRequestModel.findByIdAndUpdate(_id, rest, { new: true });
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


