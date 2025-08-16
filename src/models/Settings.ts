import { Schema, model, models } from "mongoose";

export interface ChurchAddress {
	street?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	country?: string;
}

export interface ChurchContact {
	phone?: string;
	email?: string;
	officeHours?: string;
}

export interface ChurchSocial {
	facebook?: string;
	instagram?: string;
	youtube?: string;
	twitter?: string;
}

export interface ChurchServiceTimes {
	sunday?: string;
	wednesday?: string;
	friday?: string;
}

export interface SettingsDocument {
	_id: string;
	name?: string;
	tagline?: string;
	description?: string;
	address?: ChurchAddress;
	contact?: ChurchContact;
	socialMedia?: ChurchSocial;
	serviceTimes?: ChurchServiceTimes;
	mission?: string;
	vision?: string;
	values?: string[];
	updatedAt: Date;
}

const settingsSchema = new Schema<SettingsDocument>(
	{
		name: String,
		tagline: String,
		description: String,
		address: {
			street: String,
			city: String,
			state: String,
			zipCode: String,
			country: String,
		},
		contact: {
			phone: String,
			email: String,
			officeHours: String,
		},
		socialMedia: {
			facebook: String,
			instagram: String,
			youtube: String,
			twitter: String,
		},
		serviceTimes: {
			sunday: String,
			wednesday: String,
			friday: String,
		},
		mission: String,
		vision: String,
		values: [{ type: String }],
	},
	{ timestamps: true }
);

export const SettingsModel = models.Settings || model<SettingsDocument>("Settings", settingsSchema);


