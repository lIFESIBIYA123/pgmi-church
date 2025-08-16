import { Schema, model, models } from "mongoose";

export interface SermonDocument {
	_id: string;
	title: string;
	preacher: string;
	date: Date;
	duration?: string;
	category?: string;
	series?: string;
	description?: string;
	thumbnail?: string;
	videoUrl?: string; // YouTube link
	audioUrl?: string;
	downloadUrl?: string;
	tags?: string[];
	views?: number;
	downloads?: number;
	isLive?: boolean;
	isLatest?: boolean;
	liveStreamUrl?: string;
	sermonNotes?: string;
	bibleReferences?: string[];
	createdAt: Date;
	updatedAt: Date;
}

const sermonSchema = new Schema<SermonDocument>(
	{
		title: { type: String, required: true },
		preacher: { type: String, required: true },
		date: { type: Date, required: true },
		duration: { type: String },
		category: { type: String },
		series: { type: String },
		description: { type: String },
		thumbnail: { type: String },
		videoUrl: { type: String },
		audioUrl: { type: String },
		downloadUrl: { type: String },
		tags: [{ type: String }],
		views: { type: Number, default: 0 },
		downloads: { type: Number, default: 0 },
		isLive: { type: Boolean, default: false },
		isLatest: { type: Boolean, default: false },
		liveStreamUrl: { type: String },
		sermonNotes: { type: String },
		bibleReferences: [{ type: String }],
	},
	{ timestamps: true }
);

export const SermonModel = models.Sermon || model<SermonDocument>("Sermon", sermonSchema);


