// app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, name, category, origin, stockKg, pricePerKg } = body;

    if (!code || !name || stockKg === undefined || pricePerKg === undefined) {
      return NextResponse.json({ error: "Missing required product fields" }, { status: 400 });
    }

    const numericStock = parseFloat(stockKg);
    const numericPrice = parseFloat(pricePerKg);

    const product = await prisma.product.create({
      data: {
        code,
        name,
        category: category || "General",
        origin: origin || "Ethiopia",
        stockKg: numericStock,
        pricePerKg: numericPrice,
        status: numericStock > 100 ? ProductStatus.IN_STOCK : ProductStatus.LOW_STOCK,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}