import mongoose, { Schema, models } from "mongoose";

export type UserRole = "client" | "freelancer";

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: UserRole;
	company?: string;
	skills?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["client", "freelancer"], required: true },
		company: { type: String },
		skills: { type: String },
	},
	{ timestamps: true }
);

export const User = models.User || mongoose.model<IUser>("User", UserSchema);


