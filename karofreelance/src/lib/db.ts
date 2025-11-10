import mongoose from "mongoose";

declare global {
	var mongooseConn: {
		conn: typeof mongoose | null;
		promise: Promise<typeof mongoose> | null;
	};
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI is not set in environment variables");
}

let cached = global.mongooseConn;

if (!cached) {
	cached = global.mongooseConn = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, {
			dbName: process.env.MONGODB_DB_NAME || undefined,
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}


