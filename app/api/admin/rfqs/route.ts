// app/api/admin/rfqs/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rfqs = await prisma.rFQ.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rfqs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch RFQs" }, { status: 500 });
  }
}