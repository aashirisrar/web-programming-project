import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import prismadb from "@/lib/prismadb";
import { polar } from "@/lib/polar";

export async function GET(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser || !currentUser.id || !currentUser.email)
            return new NextResponse("Unauthorized", { status: 401 });

        // Check if user has existing subscription by querying Polar directly
        try {
            // Get all customers and filter by external ID
            const customers = await polar.customers.list({});
            
            // Filter by external ID on the client side
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
                    await prismadb.userSubscription.upsert({
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

                    // Redirect to customer portal
                    const portalUrl = `${request.nextUrl.origin}/api/polar/portal`;
                    return new NextResponse(JSON.stringify({ url: portalUrl }));
                }
            }
        } catch (error) {
            console.log("Error checking existing customer:", error);
            // Continue to checkout if customer doesn't exist
        }

        // Get the product ID from environment
        const productId = process.env.POLAR_PRODUCT_ID;
        
        if (!productId) {
            console.error("POLAR_PRODUCT_ID environment variable is not set");
            return new NextResponse("Product configuration error", { status: 500 });
        }

        // Create checkout URL with external customer ID
        const checkoutUrl = new URL(`${request.nextUrl.origin}/api/polar/checkout`);
        checkoutUrl.searchParams.set('products', productId);
        checkoutUrl.searchParams.set('customerEmail', currentUser.email);
        if (currentUser.name) {
            checkoutUrl.searchParams.set('customerName', currentUser.name);
        }
        checkoutUrl.searchParams.set('customerExternalId', currentUser.id);

        return new NextResponse(JSON.stringify({ url: checkoutUrl.toString() }));
    } catch (error) {
        console.log("[POLAR_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}