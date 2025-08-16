import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase(): Promise<typeof mongoose> {
	if (isConnected && mongoose.connection.readyState === 1) {
		return mongoose;
	}

	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) {
		throw new Error("MONGODB_URI is not set in environment variables");
	}

	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(mongoUri);
		isConnected = true;
	}

	return mongoose;
}


