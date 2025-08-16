import { Schema, model, models } from "mongoose";

export type UserRole = "admin" | "editor" | "viewer" | "pastor";

export interface UserDocument {
	_id: string;
	name: string;
	email: string;
	passwordHash?: string;
	role: UserRole;
	isMainAdmin?: boolean;
	avatar?: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true, index: true },
		passwordHash: { type: String },
		role: { type: String, enum: ["admin", "editor", "viewer", "pastor"], default: "viewer" },
		isMainAdmin: { type: Boolean, default: false },
		avatar: { type: String },
	},
	{ timestamps: true }
);

export const UserModel = models.User || model<UserDocument>("User", userSchema);


