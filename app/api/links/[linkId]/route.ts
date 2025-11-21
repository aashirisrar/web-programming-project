import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  linkId?: string;
}

// GET /api/links/[linkId] - Get a specific link
export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { linkId } = await params;

    if (!linkId || typeof linkId !== "string") {
      return new NextResponse("Link ID is required", { status: 400 });
    }

    // Get the link
    const link = await prisma.link.findUnique({
      where: {
        id: linkId
      },
      include: {
        analytics: true
      }
    });

    if (!link) {
      return new NextResponse("Link not found", { status: 404 });
    }

    // Check if the link belongs to the current user
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id!!
      }
    });

    if (!user || link.userId !== user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error("[LINK_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH /api/links/[linkId] - Update a specific link
export async function PATCH(
  req: Request,
  { params }: { params: Promise<IParams> }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, url } = body;

    const { linkId } = await params;

    if (!linkId || typeof linkId !== "string") {
      return new NextResponse("Link ID is required", { status: 400 });
    }

    if (!title && !url) {
      return new NextResponse("Title or URL is required", { status: 400 });
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

    // Check if the link exists and belongs to the user
    const existingLink = await prisma.link.findUnique({
      where: {
        id: linkId
      }
    });

    if (!existingLink || existingLink.userId !== user.id) {
      return new NextResponse("Unauthorized or link not found", { status: 401 });
    }

    // Update the link
    const updatedLink = await prisma.link.update({
      where: {
        id: linkId
      },
      data: {
        ...(title && { title }),
        ...(url && { url })
      }
    });

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error("[LINK_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE /api/links/[linkId] - Delete a specific link
export async function DELETE(
  req: Request,
  { params }: { params: Promise<IParams> }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { linkId } = await params;

    if (!linkId || typeof linkId !== "string") {
      return new NextResponse("Link ID is required", { status: 400 });
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

    // Check if the link exists and belongs to the user
    const existingLink = await prisma.link.findUnique({
      where: {
        id: linkId
      }
    });

    if (!existingLink || existingLink.userId !== user.id) {
      return new NextResponse("Unauthorized or link not found", { status: 401 });
    }

    // Delete the link and its analytics
    await prisma.linkAnalytics.deleteMany({
      where: {
        linkId
      }
    });

    await prisma.link.delete({
      where: {
        id: linkId
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[LINK_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
