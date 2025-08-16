import { Schema, model, models } from "mongoose";

export interface EventDocument {
	_id: string;
	title: string;
	date: Date;
	time?: string;
	location?: string;
	category?: string;
	series?: string;
	description?: string;
	image?: string;
	attendees?: number;
	maxAttendees?: number;
	isRecurring?: boolean;
	recurrence?: string;
	registration?: boolean;
	tags?: string[];
	featured?: boolean;
	isActive?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const eventSchema = new Schema<EventDocument>(
	{
		title: { type: String, required: true },
		date: { type: Date, required: true },
		time: { type: String },
		location: { type: String },
		category: { type: String },
		series: { type: String },
		description: { type: String },
		image: { type: String },
		attendees: { type: Number, default: 0 },
		maxAttendees: { type: Number },
		isRecurring: { type: Boolean, default: false },
		recurrence: { type: String },
		registration: { type: Boolean, default: false },
		tags: [{ type: String }],
		featured: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

export const EventModel = models.Event || model<EventDocument>("Event", eventSchema);


