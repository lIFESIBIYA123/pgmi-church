import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { PastorModel } from "@/models/Pastor";
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
    const pastors = await PastorModel.find({ isActive: true });
    return NextResponse.json({ pastors });
  } catch (err) {
    console.error('Pastor GET Error:', err);
    return NextResponse.json(
      { error: "Failed to fetch pastors" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!isMainAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();
    const created = await PastorModel.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('Pastor POST Error:', err);
    return NextResponse.json(
      { error: "Failed to create pastor" },
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
    const { id, ...update } = body || {};

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const updated = await PastorModel.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Pastor not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('Pastor PUT Error:', err);
    return NextResponse.json(
      { error: "Failed to update pastor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!isMainAdmin(session)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deleted = await PastorModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Pastor not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Pastor deleted successfully",
      deletedId: id
    });
  } catch (err) {
    console.error('Pastor DELETE Error:', err);
    return NextResponse.json(
      { error: "Failed to delete pastor" },
      { status: 500 }
    );
  }
}
