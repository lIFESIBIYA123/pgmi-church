import { Schema, model, models } from "mongoose";

export type PrayerUrgency = "low" | "normal" | "high" | "critical";
export type PrayerStatus = "pending" | "praying" | "answered" | "closed";

export interface PrayerRequestDocument {
	_id: string;
	name: string;
	email: string;
	phone?: string;
	requestType?: string;
	title: string;
	description: string;
	urgency: PrayerUrgency;
	isAnonymous: boolean;
	allowSharing: boolean;
	status: PrayerStatus;
	assignedTo?: string; // user id of pastor
	createdAt: Date;
	updatedAt: Date;
}

const prayerRequestSchema = new Schema<PrayerRequestDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
		requestType: { type: String },
		title: { type: String, required: true },
		description: { type: String, required: true },
		urgency: { type: String, enum: ["low", "normal", "high", "critical"], default: "normal" },
		isAnonymous: { type: Boolean, default: false },
		allowSharing: { type: Boolean, default: false },
		status: { type: String, enum: ["pending", "praying", "answered", "closed"], default: "pending" },
		assignedTo: { type: String },
	},
	{ timestamps: true }
);

export const PrayerRequestModel = models.PrayerRequest || model<PrayerRequestDocument>("PrayerRequest", prayerRequestSchema);


