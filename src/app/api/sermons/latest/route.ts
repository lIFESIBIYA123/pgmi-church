import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SermonModel } from "@/models/Sermon";

export async function GET() {
	await connectToDatabase();
	const latest = await SermonModel.findOne({ isLatest: true }).sort({ date: -1 }).lean();
	if (!latest) {
		const fallback = await SermonModel.findOne().sort({ date: -1 }).lean();
		return NextResponse.json(fallback ?? null);
	}
	return NextResponse.json(latest);
}


