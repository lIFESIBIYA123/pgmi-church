import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export type Role = "admin" | "editor" | "viewer" | "pastor";

export async function getAuthToken(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	return token;
}

export async function requireRole(req: NextRequest, allowed: Role[] | "any") {
	const token = await getAuthToken(req);
	if (!token) throw new Error("Unauthorized");
	if (token.isMainAdmin) return token; // Main admin has access to everything
	if (allowed === "any") return token;
	if (!allowed.includes((token.role as Role) ?? "viewer")) {
		throw new Error("Forbidden");
	}
	return token;
}

export async function requireMainAdmin(req: NextRequest) {
	const token = await getAuthToken(req);
	if (!token) throw new Error("Unauthorized");
	if (!token.isMainAdmin) throw new Error("Forbidden");
	return token;
}


