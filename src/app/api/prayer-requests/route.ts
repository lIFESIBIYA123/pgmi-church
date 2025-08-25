import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PrayerRequestModel } from "@/models/PrayerRequest";

export async function GET() {
	await connectToDatabase();
	// Only pastor or admin can list requests
	// Note: middleware already restricts /api/admin, but this is public route; gate here if needed
	const items = await PrayerRequestModel.find().sort({ createdAt: -1 }).lean();
	return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const created = await PrayerRequestModel.create(data);
	return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const { _id, ...rest } = data;
	const updated = await PrayerRequestModel.findByIdAndUpdate(_id, rest, { new: true });
	return NextResponse.json(updated);
}


