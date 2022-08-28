"use strict";

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
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Pulau",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Pegunungan",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Kolam renang",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Taman",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Gua",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Luxe",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Pantai",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Berkemah",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Pedesaan",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "kota",
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
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
