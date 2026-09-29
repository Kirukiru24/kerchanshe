// app/actions/admin.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  Role,
  PostStatus,
  ProductStatus,
  OrderStatus,
  RFQStatus,
  ShipmentStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

// Helper for inline Server Action session and role checks
async function verifyActionRole(allowedRoles: Role[]) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Active session required.");
  }
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error("Forbidden: Insufficient permissions.");
  }
  return session.user;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // Replace spaces with -
    .replace(/[^\w\-]+/g, "")    // Remove all non-word chars
    .replace(/\-\-+/g, "-");     // Replace multiple - with single -
}

// -----------------------------------------------------------------------------
// POST / JOURNAL CONTENT ACTIONS
// -----------------------------------------------------------------------------

export async function getPostsAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.CONTENT_EDITOR,
    Role.EXECUTIVE_VIEWER,
  ]);

  return await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createPost(formData: FormData) {
  const user = await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.CONTENT_EDITOR,
  ]);

  const title = formData.get("title") as string;
  const content = (formData.get("content") as string) || "";
  const category = (formData.get("category") as string) || "Harvest Report";
  const status = (formData.get("status") as PostStatus) || PostStatus.DRAFT;
  const subtitle = (formData.get("subtitle") as string) || null;
  const excerpt = (formData.get("excerpt") as string) || null;
  const coverImage = (formData.get("coverImage") as string) || null;

  if (!title || title.trim() === "") {
    throw new Error("Article title is required.");
  }

  const rawSlug = (formData.get("slug") as string) || title;
  let slug = slugify(rawSlug);

  if (!slug) {
    slug = `post-${Date.now()}`;
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      category,
      subtitle,
      excerpt,
      coverImage,
      status,
      authorId: user.id,
    },
  });

  revalidatePath("/admin/content");
}

export async function togglePostStatus(postId: string, currentStatus: PostStatus) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.CONTENT_EDITOR,
  ]);

  const newStatus =
    currentStatus === PostStatus.PUBLISHED
      ? PostStatus.DRAFT
      : PostStatus.PUBLISHED;

  await prisma.post.update({
    where: { id: postId },
    data: { status: newStatus },
  });

  revalidatePath("/admin/content");
}

// -----------------------------------------------------------------------------
// FARM ACTIONS
// -----------------------------------------------------------------------------

export async function getFarmsAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.FARM_LEAD,
    Role.EXECUTIVE_VIEWER,
  ]);

  return await prisma.farm.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createFarm(formData: FormData) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.FARM_LEAD,
  ]);

  const name = formData.get("name") as string;
  const sectorPath = formData.get("sectorPath") as string;

  if (!name || !sectorPath) {
    throw new Error("Name and Sector Path are required.");
  }

  const slugInput = formData.get("slug") as string;
  const slug = slugInput && slugInput.trim() !== "" ? slugify(slugInput) : slugify(name);

  await prisma.farm.create({
    data: {
      name,
      slug,
      sectorPath,
      status: "Live",
    },
  });

  revalidatePath("/admin/farms");
}

// -----------------------------------------------------------------------------
// PRODUCT ACTIONS
// -----------------------------------------------------------------------------

export async function getProductsAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.FARM_LEAD,
    Role.EXECUTIVE_VIEWER,
  ]);

  return await prisma.product.findMany({
    include: { farm: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(formData: FormData) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.FARM_LEAD,
  ]);

  const code = formData.get("code") as string;
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const origin = formData.get("origin") as string;
  const stockKgStr = formData.get("stockKg") as string;
  const pricePerKgStr = formData.get("pricePerKg") as string;
  const farmId = (formData.get("farmId") as string) || null;

  if (!code || !name || !category || !origin || !stockKgStr || !pricePerKgStr) {
    throw new Error("Required product fields are missing.");
  }

  const stockKg = parseFloat(stockKgStr);
  const pricePerKg = parseFloat(pricePerKgStr);

  await prisma.product.create({
    data: {
      code,
      name,
      category,
      origin,
      stockKg,
      pricePerKg,
      status: stockKg > 0 ? ProductStatus.IN_STOCK : ProductStatus.OUT_OF_STOCK,
      farmId: farmId && farmId.trim() !== "" ? farmId : null,
    },
  });

  revalidatePath("/admin/products");
}

// -----------------------------------------------------------------------------
// ORDER ACTIONS
// -----------------------------------------------------------------------------

export async function getOrdersAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.LOGISTICS_MANAGER,
    Role.EXECUTIVE_VIEWER,
  ]);

  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.LOGISTICS_MANAGER,
  ]);

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath("/admin/orders");
}

// -----------------------------------------------------------------------------
// RFQ (REQUEST FOR QUOTE) ACTIONS
// -----------------------------------------------------------------------------

export async function getRFQsAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.EXECUTIVE_VIEWER,
  ]);

  return await prisma.rFQ.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateRFQStatus(rfqId: string, status: RFQStatus) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
  ]);

  await prisma.rFQ.update({
    where: { id: rfqId },
    data: { status },
  });

  revalidatePath("/admin/rfqs");
}

// -----------------------------------------------------------------------------
// SHIPMENT ACTIONS
// -----------------------------------------------------------------------------

export async function getShipmentsAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.LOGISTICS_MANAGER,
    Role.EXECUTIVE_VIEWER,
  ]);

  return await prisma.shipment.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createShipment(formData: FormData) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.LOGISTICS_MANAGER,
  ]);

  const code = formData.get("code") as string;
  const destination = formData.get("destination") as string;
  const carrier = formData.get("carrier") as string;
  const containerRef = formData.get("containerRef") as string;
  const etaStr = formData.get("eta") as string;

  if (!code || !destination || !carrier || !containerRef || !etaStr) {
    throw new Error("All shipment fields are required.");
  }

  await prisma.shipment.create({
    data: {
      code,
      destination,
      carrier,
      containerRef,
      eta: new Date(etaStr),
      status: ShipmentStatus.PREPARATION,
    },
  });

  revalidatePath("/admin/shipments");
}

export async function updateShipmentStatus(shipmentId: string, status: ShipmentStatus) {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.LOGISTICS_MANAGER,
  ]);

  await prisma.shipment.update({
    where: { id: shipmentId },
    data: { status },
  });

  revalidatePath("/admin/shipments");
}

// -----------------------------------------------------------------------------
// USER MANAGEMENT ACTIONS
// -----------------------------------------------------------------------------

export async function getUsersAdmin() {
  await verifyActionRole([Role.SUPER_ADMIN, Role.ADMIN]);

  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      brandScope: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createUserAdmin(formData: FormData) {
  await verifyActionRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as Role) || Role.CONTENT_EDITOR;
  const brandScope = (formData.get("brandScope") as string) || null;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      brandScope,
    },
  });

  revalidatePath("/admin/users");
}

// -----------------------------------------------------------------------------
// SYSTEM SETTINGS ACTIONS
// -----------------------------------------------------------------------------

export async function getSystemSettingsAdmin() {
  await verifyActionRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.EXECUTIVE_VIEWER,
  ]);

  const settings = await prisma.systemSettings.findFirst();

  if (!settings) {
    return await prisma.systemSettings.create({
      data: {
        siteName: "Kerchanshe Agriculture",
        supportEmail: "support@kerchanshe.com",
        currency: "USD",
      },
    });
  }

  return settings;
}

export async function updateSystemSettings(formData: FormData) {
  await verifyActionRole([Role.SUPER_ADMIN]);

  const siteName = formData.get("siteName") as string;
  const supportEmail = formData.get("supportEmail") as string;
  const currency = formData.get("currency") as string;

  const existingSettings = await prisma.systemSettings.findFirst();

  if (existingSettings) {
    await prisma.systemSettings.update({
      where: { id: existingSettings.id },
      data: { siteName, supportEmail, currency },
    });
  } else {
    await prisma.systemSettings.create({
      data: { siteName, supportEmail, currency },
    });
  }

  revalidatePath("/admin/settings");
}