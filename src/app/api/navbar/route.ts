import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { NavbarModel } from "@/models/Navbar";
import { z } from "zod";

const navItemSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Label cannot be empty"),
  href: z.string().min(1, "URL cannot be empty"),
  order: z.number(),
  visible: z.boolean(),
});

const navbarSchema = z.object({
  items: z.array(navItemSchema),
});

export async function GET() {
	await connectToDatabase();
	const navbar = await NavbarModel.findOne().lean();

	if (!navbar) {
		// Return default navbar items if none exist
		return NextResponse.json({
			items: [
				{ id: '1', label: 'Home', href: '/', order: 1, visible: true },
				{ id: '2', label: 'About', href: '/about', order: 2, visible: true },
				{ id: '3', label: 'Ministries', href: '/ministries', order: 3, visible: true },
				{ id: '4', label: 'Sermons', href: '/sermons', order: 4, visible: true },
				{ id: '5', label: 'Events', href: '/events', order: 5, visible: true },
				{ id: '6', label: 'Contact', href: '/contact', order: 6, visible: true },
        { id: '7', label: 'Giving', href: '/giving', order: 7, visible: true },
        { id: '8', label: 'Prayer', href: '/prayer', order: 8, visible: true },
			]
		});
	}

	return NextResponse.json(navbar);
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const rawData = await req.json();

  const parsed = navbarSchema.safeParse(rawData);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

	// Upsert navbar data
	const navbar = await NavbarModel.findOneAndUpdate(
		{},
		{ items: parsed.data.items },
		{ upsert: true, new: true }
	);

	return NextResponse.json(navbar);
}


