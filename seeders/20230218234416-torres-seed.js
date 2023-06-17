'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    let torres = [];
    for (let i = 1; i <= 100; i++) {
      let torre = {
        id:i,
        nombre: "TORRE#" + i,
        altura: (i * 10),
        lat: "1111111111",
        lng: "1111111111",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      torres.push(torre);
    }

    return queryInterface.bulkInsert('Torres', torres);


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Torres', null, {});
  }
};
