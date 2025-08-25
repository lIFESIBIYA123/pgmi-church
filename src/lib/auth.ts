import NextAuth, { NextAuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

// Extended user interface
interface ExtendedUser extends User {
	role?: string;
	isMainAdmin?: boolean;
}

export const authOptions: NextAuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
		Credentials({
			name: "Email and Password",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials): Promise<ExtendedUser | null> {
				const parsed = credentialsSchema.safeParse(credentials);
				if (!parsed.success) return null;
				const { email, password } = parsed.data;

				await connectToDatabase();
				const user = await UserModel.findOne({ email });
				if (!user || !user.passwordHash) return null;
				const valid = await bcrypt.compare(password, user.passwordHash);
				if (!valid) return null;
				return {
					id: String(user._id),
					name: user.name,
					email: user.email,
					image: user.avatar,
					role: user.role,
					isMainAdmin: user.isMainAdmin,
				};
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			await connectToDatabase();
			if (account?.provider === "google" && user?.email) {
				const existing = await UserModel.findOne({ email: user.email });
				if (!existing) {
					await UserModel.create({
						name: user.name ?? "Google User",
						email: user.email,
						role: "viewer",
						avatar: user.image,
					});
				}
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				const extendedUser = user as ExtendedUser;
				token.role = extendedUser.role;
				token.isMainAdmin = extendedUser.isMainAdmin;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				(session.user as ExtendedUser).role = token.role as string;
				(session.user as ExtendedUser).isMainAdmin = token.isMainAdmin as boolean;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
