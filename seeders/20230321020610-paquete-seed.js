'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    let paquetes = [];
    for (let i = 1; i <= 10; i++) {
      paquetes.push({
        name: 'Paquete ' + i,
        tx: ((6 + i) + ' mb'),
        rx: (3 + i) + ' mb',
        precio: (4 + i) + '00.00',
        descripcion: i + "00.00",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Paquetes', paquetes);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
