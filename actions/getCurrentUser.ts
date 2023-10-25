import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOption);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: { orders: true },
    });

    if (!currentUser) {
      return null;
    }

    if (currentUser.role === "SELLER") {
      return {
        ...currentUser,
        sellerId: currentUser.id,
        createdAt: currentUser.createdAt.toISOString(),
        updateAt: currentUser.updateAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
      };
    } else {
      return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updateAt: currentUser.updateAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
      };
    }
  } catch (error) {}
}
