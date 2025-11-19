import prisma from "@/lib/prismadb";
import { polar } from "@/lib/polar";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

const DAY_IN_MS = 86_400_000;

export const getSubscription = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return false;

    try {
        // First, try to get fresh data from Polar using external customer ID
        const customers = await polar.customers.list({});
        const customer = customers.result?.items.find(c => c.externalId === currentUser.id);

        if (customer) {
            // Get customer subscriptions
            const subscriptions = await polar.subscriptions.list({
                customerId: customer.id,
            });

            // Check if there's an active subscription
            const activeSubscription = subscriptions.result?.items.find(
                sub => sub.status === 'active' || sub.status === 'trialing'
            );

            if (activeSubscription) {
                // Update local database with subscription info
                await prisma.userSubscription.upsert({
                    where: { userId: currentUser.id },
                    create: {
                        userId: currentUser.id,
                        polarCustomerId: customer.id,
                        polarSubscriptionId: activeSubscription.id,
                        polarProductId: activeSubscription.productId,
                        polarCurrentPeriodEnd: activeSubscription.currentPeriodEnd ? new Date(activeSubscription.currentPeriodEnd) : null,
                    },
                    update: {
                        polarCustomerId: customer.id,
                        polarSubscriptionId: activeSubscription.id,
                        polarProductId: activeSubscription.productId,
                        polarCurrentPeriodEnd: activeSubscription.currentPeriodEnd ? new Date(activeSubscription.currentPeriodEnd) : null,
                    },
                });

                // Check if subscription is valid (not expired)
                const periodEndTime = activeSubscription.currentPeriodEnd ? new Date(activeSubscription.currentPeriodEnd).getTime() : 0;
                const isValid = periodEndTime + DAY_IN_MS > Date.now();

                return isValid;
            }
        }

        // If no active subscription found in Polar, clean up local database
        await prisma.userSubscription.deleteMany({
            where: { userId: currentUser.id },
        });

        return false;
    } catch (error) {
        console.log("Error checking subscription from Polar:", error);
        
        // Fallback to local database check
        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId: currentUser?.id,
            },
            select: {
                polarSubscriptionId: true,
                polarCurrentPeriodEnd: true,
                polarCustomerId: true,
                polarProductId: true,
            },
        });

        if (!userSubscription) return false;

        const periodEndTime = userSubscription.polarCurrentPeriodEnd?.getTime();
        const isValid =
            userSubscription.polarProductId &&
            periodEndTime !== undefined &&
            periodEndTime + DAY_IN_MS > Date.now();

        return !!isValid;
    }
};