// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@kerchanshe.com";
  const rawPassword = "AdminPassword123!"; // Change this to your preferred default password

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    console.log(`[Seed] User ${adminEmail} already exists. Skipping...`);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  // Create Super Admin user
  const admin = await prisma.user.create({
    data: {
      name: "System Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log("--------------------------------------------------");
  console.log("✅ Seed completed successfully!");
  console.log(`User created: ${admin.email}`);
  console.log(`Role: ${admin.role}`);
  console.log(`Password: ${rawPassword}`);
  console.log("--------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });