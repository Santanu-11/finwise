import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                await dbConnect();
                const user = await User.findOne({ email: credentials?.email });
                if (!user) return null;
                const ok = await bcrypt.compare(credentials!.password as string, user.password || "");
                if (!ok) return null;
                return { id: String(user._id), email: user.email, name: user.name } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (user) token.userId = (user as any).id;
        if (account?.provider === "google" && profile?.email) {
            await dbConnect();
            const existing = await User.findOne({ email: profile.email });
            if (!existing) {
                const created = await User.create({ email: profile.email, name: (profile as any).name });
                token.userId = String(created._id);
            } 
            else token.userId = String(existing._id);
        }
        return token;
    },
    async session({ session, token }) {
        (session as any).userId = token.userId || session.user?.email;
        return session;
    },
    },
    pages: { signIn: "/" },
};