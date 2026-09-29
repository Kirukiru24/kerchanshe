// app/api/admin/settings/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const settings = await prisma.systemSettings.findFirst();

    // Fallback default values if database table is initially empty
    if (!settings) {
      return NextResponse.json({
        siteName: "Kerchanshe Agriculture",
        supportEmail: "support@kerchanshe.com",
        currency: "USD",
      });
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { siteName, supportEmail, currency } = body;

    const currentSetting = await prisma.systemSettings.findFirst();

    const updated = currentSetting
      ? await prisma.systemSettings.update({
          where: { id: currentSetting.id },
          data: { siteName, supportEmail, currency },
        })
      : await prisma.systemSettings.create({
          data: {
            siteName: siteName || "Kerchanshe Agriculture",
            supportEmail: supportEmail || "support@kerchanshe.com",
            currency: currency || "USD",
          },
        });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to save settings" },
      { status: 500 }
    );
  }
}