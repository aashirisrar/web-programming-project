import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

// PATCH /api/links/reorder - Reorder links
export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { links } = body;

    if (!links || !Array.isArray(links)) {
      return new NextResponse("Links array is required", { status: 400 });
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

    // Update each link position in a transaction
    await prisma.$transaction(
      links.map(link =>
        prisma.link.update({
          where: {
            id: link.id,
            userId: user.id // Ensure link belongs to user
          },
          data: { position: link.position }
        })
      )
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[LINKS_REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
