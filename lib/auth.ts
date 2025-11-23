import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prismadb";

import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig
})

export default NextAuth