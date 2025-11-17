import bcrypt from "bcryptjs"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { MAX_FREE_CREDITS } from "@/constants"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, username, password } = body

        if (!email || !username || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        if (username.includes(" ")) {
            return NextResponse.json({ error: "Username cannot contain spaces" }, { status: 400 })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: "Email or username already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                username,
                hashedPassword,
                apiLimit: {
                    create: {
                        credits: MAX_FREE_CREDITS,
                    }
                }
            },
            include: {
                apiLimit: true
            }
        })

        return NextResponse.json({
            user: {
                email: user.email,
                username: user.username,
            }
        }, { status: 201 })
    } catch (error) {
        console.error("Error creating user and resume:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}