import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const { email, password } = (await req.json()) as { email: string; password: string };

		if (!email || !password) {
			return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
		}

		const user = await User.findOne({ email: email.toLowerCase() });
		if (!user) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		const secret = process.env.JWT_SECRET as jwt.Secret;
		const token = jwt.sign(
			{ sub: user._id.toString(), email: user.email, role: user.role },
			secret,
			{ expiresIn: process.env.JWT_EXPIRES || "7d" } as any
		);

		const res = NextResponse.json({
			user: {
				id: user._id.toString(),
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
			},
		});

		res.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
			sameSite: "lax",
		});

		return res;
	} catch {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}


