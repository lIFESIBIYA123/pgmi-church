import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST() {
	await connectToDatabase();
	const email = process.env.SEED_ADMIN_EMAIL;
	const password = process.env.SEED_ADMIN_PASSWORD;
	const name = process.env.SEED_ADMIN_NAME || "Main Admin";
	if (!email || !password) {
		return NextResponse.json({ error: "Seed admin env not set" }, { status: 500 });
	}

	const existing = await UserModel.findOne({ email });
	if (existing) {
		return NextResponse.json({ message: "Admin already exists" });
	}

	const passwordHash = await bcrypt.hash(password, 10);
	await UserModel.create({
		name,
		email,
		passwordHash,
		role: "admin",
		isMainAdmin: true,
	});

	return NextResponse.json({ message: "Seeded main admin" });
}


