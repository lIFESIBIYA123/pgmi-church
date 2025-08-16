import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SettingsModel } from "@/models/Settings";

export async function GET() {
	await connectToDatabase();
	const s = await SettingsModel.findOne().lean();
	return NextResponse.json(s ?? {});
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const body = await req.json();
	const updated = await SettingsModel.findOneAndUpdate({}, body, { upsert: true, new: true });
	return NextResponse.json(updated);
}


