import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ContactModel } from "@/models/Contact";

export async function GET() {
	await connectToDatabase();
	const items = await ContactModel.find().sort({ createdAt: -1 }).lean();
	return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();
	const created = await ContactModel.create(data);
	return NextResponse.json(created, { status: 201 });
}

export async function DELETE(req: NextRequest) {
	await connectToDatabase();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

	const deleted = await ContactModel.findByIdAndDelete(id);
	if (!deleted) return NextResponse.json({ error: 'Contact not found' }, { status: 404 });

	return NextResponse.json({ message: 'Contact deleted successfully' });
}


