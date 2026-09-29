// app/api/admin/settings/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // If your model in schema.prisma is named "Settings" or "Setting", adjust `prisma.systemSettings` accordingly.
    const settings = await (prisma as any).systemSettings?.findFirst() ?? {};
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Prisma Error in /api/admin/settings:", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch settings" }, { status: 500 });
  }
}