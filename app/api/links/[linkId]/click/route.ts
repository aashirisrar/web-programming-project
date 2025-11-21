import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  linkId?: string;
}

// POST /api/links/[linkId]/click - Track a click on a link
export async function POST(
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

    // Get the link's analytics
    const analytics = await prisma.linkAnalytics.findFirst({
      where: {
        linkId
      }
    });

    if (!analytics) {
      return new NextResponse("Analytics not found", { status: 404 });
    }

    // Update the click count and timestamp
    await prisma.linkAnalytics.update({
      where: {
        id: analytics.id
      },
      data: {
        clickCount: {
          increment: 1
        },
        lastClickedAt: new Date()
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[LINK_CLICK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
