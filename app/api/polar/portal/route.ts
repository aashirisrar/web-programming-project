import { CustomerPortal } from "@polar-sh/nextjs";
import { NextRequest } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (req: NextRequest) => {
    try {
      // Get current user
      const currentUser = await getCurrentUser();
      
      if (!currentUser?.id) {
        throw new Error("User not authenticated");
      }

      // Get user's subscription to find Polar customer ID
      const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
          userId: currentUser.id,
        },
        select: {
          polarCustomerId: true,
        },
      });

      if (!userSubscription?.polarCustomerId) {
        throw new Error("No subscription found for user");
      }

      return userSubscription.polarCustomerId;
    } catch (error) {
      console.error("Error getting customer ID:", error);
      throw error;
    }
  },
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
});
