import { z } from "zod";

// 🎯 Sermon Input Schema
export const SermonInputSchema = z.object({
  title: z.string().min(3, "Sermon title is required and must be at least 3 characters long"),
  preacher: z.string().min(3, "Preacher name is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  description: z.string().min(10, "Description is required"),
  youtubeLink: z.string().url("YouTube link must be a valid URL"),
  thumbnailUrl: z.string().url("Thumbnail must be a valid image URL"),
  isLive: z.boolean().default(false), // If it’s a live sermon link
  isLatest: z.boolean().default(false), // To mark the sermon as "Latest Sermon"
  tags: z.array(z.string()).optional(), // For categorizing sermons (e.g., "Faith", "Worship")
  createdAt: z.string().optional(), // Auto-set on backend
  updatedAt: z.string().optional(), // Auto-set on backend
});

// 🎯 TypeScript type from schema
export type ISermonInput = z.infer<typeof SermonInputSchema>;
