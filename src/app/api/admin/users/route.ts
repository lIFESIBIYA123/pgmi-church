import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";

interface SessionUser {
  role?: string;
}

interface Session {
  user?: SessionUser;
}

function isAdmin(session: Session | null): boolean {
  return session?.user?.role === "admin";
}

export async function GET() {
  await connectToDatabase();
  const users = await UserModel.find().select("name email role isMainAdmin avatar createdAt");
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();

  try {
    const body = await req.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const createdUser = await UserModel.create({ name, email, role });
    return NextResponse.json(createdUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
