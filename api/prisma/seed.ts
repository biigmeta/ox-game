import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../src/utils/password";
const admin = {
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "OX",
  password: "admin123",
};

const prisma = new PrismaClient();
async function main() {
  /* ----------------------------- truncate tables ---------------------------- */
  console.log("🗑️ Truncating tables...");
  await prisma.$executeRaw`TRUNCATE TABLE "Histories" ,"Authentications", "Users" RESTART IDENTITY CASCADE;`;
  console.log("✅ Tables truncated.");

  /* -------------------------- create admin user -------------------------- */
  console.log("👤 Creating admin user...");

  const adminUser = await prisma.users.create({
    data: {
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: "admin", // Assuming ADMIN is a valid role in your UserRole enum
    },
  });
  /* -------------------------- create authentication for admin user -------------------------- */
  console.log("🔑 Creating authentication for admin user...");

  const passwordHash = encryptPassword(admin.password!);
  const adminAuth = await prisma.authentications.create({
    data: {
      userId: adminUser.id,
      provider: "email", // Assuming EMAIL is a valid provider in your AuthenticationProvider enum
      subject: adminUser.email,
      password: passwordHash,
      email: adminUser.email,
    },
  });
  console.log("✅ Admin authentication created:", adminAuth.subject);
  console.log("✅ Seeding completed.");
  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
