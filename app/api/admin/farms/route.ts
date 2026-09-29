import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const farms = await prisma.farm.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(farms);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch farms" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, sectorPath } = body;

    if (!name || !sectorPath) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const farm = await prisma.farm.create({
      data: { name, sectorPath, slug },
    });

    return NextResponse.json(farm, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create farm" }, { status: 500 });
  }
}