import { Schema, model, models } from "mongoose";

export interface SocialMedia {
	facebook?: string;
	instagram?: string;
	youtube?: string;
	twitter?: string;
}

export interface Address {
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface Contact {
	phone: string;
	email: string;
}

export interface QuickLink {
	label: string;
	href: string;
	enabled?: boolean;
}

export interface FooterDocument {
	_id: string;
	churchName: string;
	tagline: string;
	description: string;
	address: Address;
	contact: Contact;
	socialMedia: SocialMedia;
	quickLinks: QuickLink[];
	copyright: string;
	updatedAt: Date;
}

const addressSchema = new Schema<Address>({
	street: { type: String, default: '' },
	city: { type: String, default: '' },
	state: { type: String, default: '' },
	zipCode: { type: String, default: '' },
	country: { type: String, default: '' },
});

const contactSchema = new Schema<Contact>({
	phone: { type: String, default: '' },
	email: { type: String, default: '' },
});

const socialMediaSchema = new Schema<SocialMedia>({
	facebook: { type: String },
	instagram: { type: String },
	youtube: { type: String },
	twitter: { type: String },
});

const quickLinkSchema = new Schema<QuickLink>({
	label: { type: String, required: true },
	href: { type: String, required: true },
	enabled: { type: Boolean, default: true },
});

const footerSchema = new Schema<FooterDocument>(
	{
		churchName: { type: String, default: 'PGMI Church' },
		tagline: { type: String, default: 'Perfecting Grace Ministries International' },
		description: { type: String, default: 'A place where faith comes alive, community thrives, and God\'s love transforms lives.' },
		address: { type: addressSchema, default: {} },
		contact: { type: contactSchema, default: {} },
		socialMedia: { type: socialMediaSchema, default: {} },
		quickLinks: { type: [quickLinkSchema], default: [] },
		copyright: { type: String, default: '© 2024 PGMI Church. All rights reserved.' },
	},
	{ timestamps: true }
);

export const FooterModel = models.Footer || model<FooterDocument>("Footer", footerSchema);


