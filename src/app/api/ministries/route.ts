import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { MinistryModel } from "@/models/Ministry";
import { SettingsModel } from "@/models/Settings";

// Ministry API GET Function
// Duty: Handles fetching ministries with conditional logic - returns either public/active ministries for frontend display or all ministries for admin management based on query parameters

export async function GET(req: NextRequest) {
	await connectToDatabase();

	const { searchParams } = new URL(req.url);
	const publicView = searchParams.get('public');

	if (publicView === 'true') {
		// Get public ministries only (for frontend display)
		const settings = await SettingsModel.findOne();
		const limit = settings?.ministriesCount ?? 6;
		const ministries = await MinistryModel.find({ isActive: true })
			.sort({ createdAt: -1 })
			.limit(limit)
			.select("name description icon color leader meetingTime")
			.lean();
		return NextResponse.json({ ministries });
	} else {
		// Get all ministries (for admin management)
		const items = await MinistryModel.find().sort({ name: 1 }).lean();
		return NextResponse.json(items);
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const created = await MinistryModel.create(data);
	return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const { _id, ...rest } = data;
	const updated = await MinistryModel.findByIdAndUpdate(_id, rest, { new: true });
	return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
	await connectToDatabase();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

	const deleted = await MinistryModel.findByIdAndDelete(id);
	if (!deleted) return NextResponse.json({ error: 'Ministry not found' }, { status: 404 });

	return NextResponse.json({ message: 'Ministry deleted successfully' });
}


