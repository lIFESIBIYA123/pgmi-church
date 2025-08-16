import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";

function assertAdmin(session: any) {
	const role = session?.user?.role;
	if (role !== "admin") {
		throw new Error("Forbidden");
	}
}

export async function GET() {
	await connectToDatabase();
	const users = await UserModel.find().select("name email role isMainAdmin avatar createdAt");
	return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);
	assertAdmin(session);
	await connectToDatabase();
	const body = await req.json();
	const { name, email, role } = body;
	if (!name || !email || !role) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}
	const existing = await UserModel.findOne({ email });
	if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });
	const created = await UserModel.create({ name, email, role });
	return NextResponse.json(created, { status: 201 });
}


