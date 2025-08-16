import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SermonModel } from "@/models/Sermon";

export async function GET() {
	await connectToDatabase();
	const items = await SermonModel.find().sort({ date: -1 }).lean();
	return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const created = await SermonModel.create(data);
	// If marked latest, unset others
	if (created.isLatest) {
		await SermonModel.updateMany({ _id: { $ne: created._id } }, { $set: { isLatest: false, isLive: false } });
	}
	return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const { _id, ...rest } = data;
	const updated = await SermonModel.findByIdAndUpdate(_id, rest, { new: true });
	if (rest.isLatest) {
		await SermonModel.updateMany({ _id: { $ne: updated?._id } }, { $set: { isLatest: false, isLive: false } });
	}
	return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
	await connectToDatabase();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

	const deleted = await SermonModel.findByIdAndDelete(id);
	if (!deleted) return NextResponse.json({ error: 'Sermon not found' }, { status: 404 });

	return NextResponse.json({ message: 'Sermon deleted successfully' });
}


