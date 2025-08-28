import NextAuth, { NextAuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";

// Ensure a default main admin exists (idempotent)
let mainAdminEnsured = false;
async function ensureMainAdminExists(): Promise<void> {
    if (mainAdminEnsured) return;
    await connectToDatabase();
    const email = "sibiyalife221@gmail.com";
    const existing = await UserModel.findOne({ email });
    if (!existing) {
        const password = "Life@sibiya123";
        const passwordHash = await bcrypt.hash(password, 10);
        await UserModel.create({
            name: "Main Admin",
            email,
            passwordHash,
            role: "admin",
            isMainAdmin: true,
        });
    } else if (!existing.isMainAdmin || existing.role !== "admin") {
        // Promote to main admin if the account exists but is not admin
        existing.isMainAdmin = true;
        existing.role = "admin";
        await existing.save();
    }
    mainAdminEnsured = true;
}

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
				// Seed or ensure the main admin before attempting auth
				await ensureMainAdminExists();
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
