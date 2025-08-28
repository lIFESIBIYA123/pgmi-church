import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SermonModel } from "@/models/Sermon";
import { SettingsModel } from "@/models/Settings";


// Sermon API GET Function
// Type: Async Arrow Function (API Route Handler)
// Duty: Handles fetching sermons with conditional logic - returns either multiple latest sermons for homepage display or a single latest/featured sermon based on query parameters

export async function GET(req: NextRequest) {
	await connectToDatabase();

	const { searchParams } = new URL(req.url);
	const latest = searchParams.get('latest');

	if (latest === 'single') {
		// Get single latest sermon (marked as latest or most recent)
		const latestSermon = await SermonModel.findOne({ isLatest: true }).sort({ date: -1 }).lean();
		if (!latestSermon) {
			const fallback = await SermonModel.findOne().sort({ date: -1 }).lean();
			return NextResponse.json(fallback ?? null);
		}
		return NextResponse.json(latestSermon);
	} else {
		// Get multiple latest sermons (for homepage display)
		const settings = await SettingsModel.findOne();
		const limit = settings?.latestSermonsCount ?? 3;
		const sermons = await SermonModel.find()
			.sort({ date: -1 })
			.limit(limit)
			.select("title description date")
			.lean();
		return NextResponse.json({ sermons });
	}
}

