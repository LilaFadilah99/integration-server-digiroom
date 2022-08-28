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
    await queryInterface.bulkInsert("Facilities", [
      {
        name: "Dapur",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Kolam renang pribadi",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Ac",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Wifi",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Tv",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Parkir gratis di areal properti",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Perlengkapan memasak",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Halaman belakang",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Alarm karbon monoksida",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Area kerja khusus",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Alarm asap",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Shampo",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Peralatan P3K",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Pembuat kopi",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Pengering rambut",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Setrika",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Gantungan baju",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Kulkas",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Mesin cuci",
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        name: "Boks bayi",
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
    await queryInterface.bulkDelete("Facilities", null, {});
  },
};
