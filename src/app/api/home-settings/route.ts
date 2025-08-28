import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { SettingsModel } from "@/models/Settings";
import type { Session } from "next-auth";

// Define the extended user type for type safety
interface UserWithAdmin {
  isMainAdmin?: boolean;
}

// Type-safe function to check admin status
function isMainAdmin(session: Session | null): boolean {
  return Boolean((session?.user as UserWithAdmin)?.isMainAdmin);
}

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SettingsModel.findOne();
    return NextResponse.json(settings ?? {});
  } catch (err) {
    console.error('Settings API Error:', err);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!isMainAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();

    const allowedKeys = [
      "showLatestSermons",
      "latestSermonsCount",
      "showUpcomingEvents",
      "upcomingEventsCount",
      "showMinistries",
      "ministriesCount",
      "showPastors",
      "pastorsCount",
    ];

    const update: Record<string, unknown> = {};
    for (const key of allowedKeys) {
      if (key in body) update[key] = body[key];
    }

    const settings = await SettingsModel.findOneAndUpdate(
      {},
      update,
      { new: true, upsert: true }
    );

    return NextResponse.json(settings);
  } catch (err) {
    console.error('Settings Update Error:', err);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
