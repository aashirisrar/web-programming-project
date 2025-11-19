import prisma from "@/lib/prismadb";

export const getUserByUsername = async (username: string) => {
  try {
    // Find a user by username
    const user = await prisma.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        theme: true,
        backgroundColor: true,
        textColor: true,
      }
    });

    if (!user) {
      return null;
    }

    // Get the user's links
    const links = await prisma.link.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        position: "asc"
      }
    });

    return {
      ...user,
      links
    };
  } catch (error) {
    console.error("[GET_USER_BY_USERNAME]", error);
    return null;
  }
};
