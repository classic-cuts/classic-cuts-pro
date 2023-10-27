import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN" && currentUser.role !== "SELLER") {
    console.log("Error in api product create route");
    return NextResponse.error();
  }
  
  const body = await request.json();
  const { name, description, price, brand, category, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
      sellerId: currentUser.id,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN" && currentUser.role !== "SELLER") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: { inStock },
  });
  return NextResponse.json(product);
}
