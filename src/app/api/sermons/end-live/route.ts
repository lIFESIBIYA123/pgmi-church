import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SermonModel } from "@/models/Sermon";

export async function POST() {
	await connectToDatabase();
	// Set the most recent live sermon to latest and end live
	const live = await SermonModel.findOne({ isLive: true }).sort({ date: -1 });
	if (!live) return NextResponse.json({ message: 'No live sermon' });
	live.isLive = false;
	live.isLatest = true;
	await live.save();
	await SermonModel.updateMany({ _id: { $ne: live._id } }, { $set: { isLatest: false } });
	return NextResponse.json({ message: 'Live sermon ended and marked latest' });
}


