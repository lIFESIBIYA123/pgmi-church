import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("file");
		if (!file || !(file instanceof Blob)) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}
		const buffer = Buffer.from(await file.arrayBuffer());
		if (hasCloudinary) {
			const uploaded = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: "pgmi" }, (err, result) => {
						if (err) reject(err);
						else resolve(result);
					})
					.end(buffer);
			});
			return NextResponse.json(uploaded);
		}
		// fallback: store in public/uploads
		const uploadsDir = path.join(process.cwd(), "public", "uploads");
		await mkdir(uploadsDir, { recursive: true });
		const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.bin`;
		const filePath = path.join(uploadsDir, filename);
		await writeFile(filePath, buffer);
		return NextResponse.json({ url: `/uploads/${filename}` });
	} catch (e) {
  return NextResponse.json(
    { error: e instanceof Error ? e.message : "Internal server error" },
    { status: 500 }
  );
}

}


