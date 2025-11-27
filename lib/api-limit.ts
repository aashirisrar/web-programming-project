import prismadb from "@/lib/prismadb";
import { MAX_FREE_CREDITS } from "@/constants";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const increaseApiCredits = async (amount: number) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("Unauthorized");
    }

    const userApiLimit = await prismadb.userApiLimit.upsert({
        where: { userId: currentUser.id },
        update: { credits: { increment: amount } },
        create: { userId: currentUser.id, credits: amount },
    });

    return userApiLimit;
};

export const deductApiCredits = async (amount: number) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("Unauthorized");
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: currentUser.id },
    });

    if (!userApiLimit || userApiLimit.credits < amount) {
        throw new Error("Insufficient credits");
    }

    const updatedLimit = await prismadb.userApiLimit.update({
        where: { userId: currentUser.id },
        data: { credits: { decrement: amount } },
    });

    return updatedLimit;
};

export const checkApiCredits = async (requiredCredits: number) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("Unauthorized");
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: currentUser.id },
    });

    if (!userApiLimit) {
        return requiredCredits <= MAX_FREE_CREDITS;
    }

    return userApiLimit.credits >= requiredCredits;
};

export const getApiCredits = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: currentUser.id },
    });

    if (!userApiLimit) return MAX_FREE_CREDITS;

    return userApiLimit.credits;
};

