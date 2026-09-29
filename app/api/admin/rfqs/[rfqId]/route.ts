// app/api/admin/rfqs/[rfqId]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, RFQStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { rfqId: string } }
) {
  try {
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updatedRFQ = await prisma.rFQ.update({
      where: { id: params.rfqId },
      data: { status: status as RFQStatus },
    });

    return NextResponse.json(updatedRFQ);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update RFQ status" }, { status: 500 });
  }
}