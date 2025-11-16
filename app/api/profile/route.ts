import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

// GET /api/profile - Get user profile
export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id!!
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        bio: true,
        theme: true,
        backgroundColor: true,
        textColor: true,
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[PROFILE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH /api/profile - Update user profile
export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();

    const {
      username,
      bio,
      image,
      theme,
      backgroundColor,
      textColor
    } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if username is being updated and is not empty
    if (username !== undefined) {
      if (!username || typeof username !== "string") {
        return new NextResponse("Username is required", { status: 400 });
      }

      // Check if username contains only valid characters
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return new NextResponse(
          "Username can only contain letters, numbers, and underscores",
          { status: 400 }
        );
      }

      // Check if username is already taken by another user
      const existingUser = await prisma.user.findUnique({
        where: {
          username
        }
      });

      if (existingUser && existingUser.email !== currentUser.email) {
        return new NextResponse("Username is already taken", { status: 409 });
      }
    }

    // Update the user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        ...(username !== undefined && { username }),
        ...(bio !== undefined && { bio }),
        ...(image !== undefined && { image }),
        ...(theme !== undefined && { theme }),
        ...(backgroundColor !== undefined && { backgroundColor }),
        ...(textColor !== undefined && { textColor }),
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[PROFILE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
