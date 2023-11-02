import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();
  const body = await request.json();
  const { userId, products } = body;
  await prisma.cart.create({
    data: {
      userId,
      products,
    },
  });
  return NextResponse.json("item added to the cart");
}

// export async function PUT(request: Request) {
//   const user = await getCurrentUser();
//   if (user) {
//     const products = await prisma.cart.findUnique({
//       where: {
//         userId: user.id,
//       },
//     });
//     return NextResponse.json(products);
//   } else {
//     return NextResponse.json(null);
//   }
// }

// export async function GET(request: Request) {
//   const user = await getCurrentUser();
//   if (user) {
//     const products = await prisma.cart.findMany({
//       where: {
//         userId: {
//           equals: user.id || "",
//           mode: "insensitive",
//         },
//       },
//     });
//     return NextResponse.json(products);
//   } else {
//     return NextResponse.json(null);
//   }
// }

// export async function DELETE(request: Request) {
//   const user = await getCurrentUser();
//   if (user) {
//     const products = await prisma.cart.findMany({
//       where: {
//         userId: {
//           equals: user.id || "",
//           mode: "insensitive",
//         },
//       },
//     });
//     return NextResponse.json(products);
//   } else {
//     return NextResponse.json(null);
//   }
// }
