const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

const seedSuperAdmin = async () => {
  try {
    const superAdminExists = await Admin.findOne({ role: "super-admin" });
    if (superAdminExists) {
      console.log("Super admin already exists. Skipping seeding.");
      return;
    }

    const { SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

    if (!SUPER_ADMIN_NAME || !SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
      console.warn("Super admin credentials missing in .env. Skipping seeding.");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, salt);

    const superAdmin = new Admin({
      name: SUPER_ADMIN_NAME,
      email: SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: "super-admin",
      createdBy: null
    });

    await superAdmin.save();
    console.log("Super admin successfully seeded!");

  } catch (error) {
    console.error("Error seeding super admin:", error);
  }
};

module.exports = seedSuperAdmin;
