import NotFound from "@/app/not-found";
import prisma from "@/libs/prismadb";
import { validateMongoId } from "@/utils/validateMongoId";

interface IParams {
  productid?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productid } = params;
    const isValid = validateMongoId(params.productid as string);
    if (!isValid) {
      return null;
    }
    const product = await prisma.product.findUnique({
      where: { id: productid },
      include: {
        reviews: {
          include: { user: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) {
      return null;
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
