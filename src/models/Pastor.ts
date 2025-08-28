import { Schema, model, models } from "mongoose";

export interface PastorSocialMedia {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
}

export interface PastorDocument {
    _id: string;
    name: string;
    title?: string;
    role?: string;
    bio?: string;
    image?: string;
    email?: string;
    phone?: string;
    socialMedia?: PastorSocialMedia;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const pastorSchema = new Schema<PastorDocument>(
    {
        name: { type: String, required: true },
        title: { type: String },
        role: { type: String },
        bio: { type: String },
        image: { type: String },
        email: { type: String },
        phone: { type: String },
        socialMedia: {
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String },
            youtube: { type: String },
            tiktok: { type: String },
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const PastorModel = models.Pastor || model<PastorDocument>("Pastor", pastorSchema);



