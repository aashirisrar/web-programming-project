import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json()
    const { username } = body

    if (!username) {
        return new NextResponse("Username is required", { status: 400 });
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return new NextResponse(
            "Username can only contain letters, numbers, and underscores",
            { status: 400 }
        );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (existingUser && existingUser.id !== currentUser.id) {
        return new NextResponse("Username is already taken", { status: 409 });
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: currentUser?.id
            },
            data: {
                username
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("[UPDATE_USERNAME]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}