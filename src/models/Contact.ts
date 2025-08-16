import { Schema, model, models } from "mongoose";

export interface ContactDocument {
	_id: string;
	name: string;
	email: string;
	phone?: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
}

const contactSchema = new Schema<ContactDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
		message: { type: String, required: true },
	},
	{ timestamps: true }
);

export const ContactModel = models.Contact || model<ContactDocument>("Contact", contactSchema);


