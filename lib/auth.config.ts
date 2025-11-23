import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import { MAX_FREE_CREDITS } from "@/constants"

export default {
    providers: [
        GitHub,
        Google,
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.hashedPassword
                )

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials")
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl + "/dashboard";
        }
    }, events: {
        async signIn({ user, account, profile, isNewUser }) {
            // This event is triggered when a user signs in.
            if (isNewUser) {
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { email: user.email!! },
                    });

                    if (!dbUser) {
                        throw new Error("User not found in database");
                    }

                    await prisma.userApiLimit.create({
                        data: {
                            userId: dbUser.id,
                            credits: MAX_FREE_CREDITS,
                        },
                    })

                    // console.log(`Profile created for user ${dbUser.id}`);
                } catch (error) {
                    console.error("Error creating profile: ", error);
                }
            }
        }
    }
} satisfies NextAuthConfig