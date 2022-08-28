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
    await queryInterface.bulkInsert("Types", [
      {
        name: "Rumah",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Apartemen",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Guesthouse",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Hotel",
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
    await queryInterface.bulkDelete("Types", null, {});
  },
};
