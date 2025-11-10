import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		const {
			firstName,
			lastName,
			email,
			password,
			role,
			company,
			skills,
		} = body as {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
			role: "client" | "freelancer";
			company?: string;
			skills?: string;
		};

		if (!firstName || !lastName || !email || !password || !role) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		const existing = await User.findOne({ email });
		if (existing) {
			return NextResponse.json({ error: "Email already in use" }, { status: 409 });
		}

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: hashed,
			role,
			company,
			skills,
		});

		const secret = process.env.JWT_SECRET as jwt.Secret;
		const token = jwt.sign(
			{ sub: user._id.toString(), email: user.email, role: user.role },
			secret,
			{ expiresIn: process.env.JWT_EXPIRES || "7d" }
		);

		const res = NextResponse.json(
			{
				user: {
					id: user._id.toString(),
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 201 }
		);

		res.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
			sameSite: "lax",
		});

		return res;
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}


