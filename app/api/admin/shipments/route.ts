// app/api/admin/shipments/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(shipments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 });
  }
}