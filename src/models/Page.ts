import { Schema, model, models } from "mongoose";

export interface PageDocument {
	_id: string;
	slug: string;
	title: string;
	content: string;
	isSystem?: boolean; // system pages cannot be deleted
	createdAt: Date;
	updatedAt: Date;
}

const pageSchema = new Schema<PageDocument>(
	{
		slug: { type: String, required: true, unique: true, lowercase: true },
		title: { type: String, required: true },
		content: { type: String, required: true },
		isSystem: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const PageModel = models.Page || model<PageDocument>("Page", pageSchema);


