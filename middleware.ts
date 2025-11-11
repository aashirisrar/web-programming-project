import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
    matcher: [
        "/dashboard",
        "/scripts",
        "/scripts/:path*",
        "/settings",
        "/settings/:path*",
        "/themes",
        "/themes/:path*",
        "/interests",
        "/interests/:path*",
        
    ],
};