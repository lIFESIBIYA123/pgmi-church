import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PageModel } from "@/models/Page";
import { requireMainAdmin, requireRole } from "@/lib/auth-helpers";

export async function GET() {
	await connectToDatabase();
	const pages = await PageModel.find().lean();
	return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
	await requireMainAdmin(req);
	await connectToDatabase();
	const data = await req.json();
	const created = await PageModel.create(data);
	return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
	await requireRole(req, ['admin', 'editor']);
	await connectToDatabase();
	const data = await req.json();
	const { _id, ...rest } = data;
	const updated = await PageModel.findByIdAndUpdate(_id, rest, { new: true });
	return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
	await requireMainAdmin(req);
	await connectToDatabase();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
	const page = await PageModel.findById(id);
	if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
	if (page.isSystem) return NextResponse.json({ error: 'Cannot delete system page' }, { status: 400 });
	await PageModel.findByIdAndDelete(id);
	return NextResponse.json({ ok: true });
}


