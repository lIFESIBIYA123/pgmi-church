import { Schema, model, models } from "mongoose";

export interface MinistryDocument {
	_id: string;
	name: string;
	description?: string;
	longDescription?: string;
	icon?: string;
	color?: string;
	meetingTime?: string;
	location?: string;
	leader?: string;
	contact?: string;
	activities?: string[];
	image?: string;
	isActive?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const ministrySchema = new Schema<MinistryDocument>(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String },
		longDescription: { type: String },
		icon: { type: String },
		color: { type: String },
		meetingTime: { type: String },
		location: { type: String },
		leader: { type: String },
		contact: { type: String },
		activities: [{ type: String }],
		image: { type: String },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

export const MinistryModel = models.Ministry || model<MinistryDocument>("Ministry", ministrySchema);


