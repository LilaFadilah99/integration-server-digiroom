"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const dateNow = new Date();
    await queryInterface.bulkInsert("Users", [
      {
        username: "william",
        email: "william@gmail.com",
        password: hashPassword("12345"),
        role: "customer",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: "milly",
        email: "milly@gmail.com",
        password: hashPassword("12345"),
        role: "customer",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: "ailee",
        email: "ailee@gmail.com",
        password: hashPassword("12345"),
        role: "customer",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
