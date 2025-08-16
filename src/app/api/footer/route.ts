import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { FooterModel } from "@/models/Footer";

export async function GET() {
	await connectToDatabase();
	const footer = await FooterModel.findOne().lean();

	if (!footer) {
		// Return default footer data if none exist
		return NextResponse.json({
			churchName: 'PGMI Church',
			tagline: 'Perfecting Grace Ministries International',
			description: 'A place where faith comes alive, community thrives, and God\'s love transforms lives.',
			address: {
				street: '',
				city: '',
				state: '',
				zipCode: '',
				country: ''
			},
			contact: {
				phone: '',
				email: ''
			},
			socialMedia: {
				facebook: '',
				instagram: '',
				youtube: '',
				twitter: ''
			},
			quickLinks: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Ministries', href: '/ministries' },
				{ label: 'Sermons', href: '/sermons' },
				{ label: 'Events', href: '/events' },
				{ label: 'Contact', href: '/contact' },
				{ label: 'Prayer Requests', href: '/prayer' }
			],
			copyright: '© 2024 PGMI Church. All rights reserved.'
		});
	}

	return NextResponse.json(footer);
}

export async function PUT(req: NextRequest) {
	await connectToDatabase();
	const data = await req.json();

	// Upsert footer data
	const footer = await FooterModel.findOneAndUpdate(
		{},
		data,
		{ upsert: true, new: true }
	);

	return NextResponse.json(footer);
}


