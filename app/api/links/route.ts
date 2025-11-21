import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

// POST /api/links - Create a new link
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, url, position } = body;

    if (!title || !url) {
      return new NextResponse("Title and URL are required", { status: 400 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: {
        email: currentUser.email!!
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Create a new link
    const link = await prisma.link.create({
      data: {
        title,
        url,
        position,
        userId: user.id
      }
    });

    // Initialize analytics for the link
    await prisma.linkAnalytics.create({
      data: {
        linkId: link.id
      }
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("[LINKS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// GET /api/links - Get all links for the current user
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
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Get all links for the user, ordered by position
    const links = await prisma.link.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        position: 'asc'
      },
      include: {
        analytics: true
      }
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error("[LINKS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
