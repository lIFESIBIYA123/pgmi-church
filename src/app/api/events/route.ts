import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { EventModel } from "@/models/Event";

export async function GET() {
	await connectToDatabase();
	const items = await EventModel.find().sort({ date: 1 }).lean();
	return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const created = await EventModel.create(data);
	return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const { _id, ...rest } = data;
	const updated = await EventModel.findByIdAndUpdate(_id, rest, { new: true });
	return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
	await connectToDatabase();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

	const deleted = await EventModel.findByIdAndDelete(id);
	if (!deleted) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

	return NextResponse.json({ message: 'Event deleted successfully' });
}


