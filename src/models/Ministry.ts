import { Schema, model, models } from "mongoose";

export interface MinistriesGalleryVideo {
	_id: string;
	youtubeUrl: string;
	thumbnail?: string;
	title: string;
	order: number;
}
export interface MinistryDocument {
	_id: string;
	name: string;
	slug: string;
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
	galleryImages?: string[];
	galleryVideos?: MinistriesGalleryVideo[];
	isActive?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const ministryGalleryVideoSchema = new Schema<MinistriesGalleryVideo>({
	youtubeUrl: { type: String, required: true },
	thumbnail: { type: String },
	title: { type: String },
	order: { type: Number, required: true, default: 0 },
});

const ministrySchema = new Schema<MinistryDocument>(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
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
		galleryImages: [{ type: String }],
		galleryVideos: [ministryGalleryVideoSchema],
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

export const MinistryModel = models.Ministry || model<MinistryDocument>("Ministry", ministrySchema);


