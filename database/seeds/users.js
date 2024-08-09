const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  return await knex("users").insert([
    {
      name: "Taufik Hidayat",
      username: "admin1",
      password: await bcrypt.hash("test123", 10),
    },
    {
      name: "Tri Nugroho Yosef Irawan",
      username: "admin2",
      password: await bcrypt.hash("admin123", 10),
    },
  ]);
};
