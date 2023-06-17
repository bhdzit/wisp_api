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
    let clientes = [];
    for (let i = 1; i <= 1000; i++) {
      clientes.push({
        id: i,
        cliente: "Cliente " + (("0000" + i).slice(-4)),
        tel1: "(771) 000 0000",
        tel2: "(771) 000 0000",
        paquete: (Math.floor(Math.random() * 10) + 1),
        torre: (Math.floor(Math.random() * 100) + 1),
        estatus: true,
        contrato:false,
        lat:"",
        lng:"",
        primer_pago:new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Clientes', clientes);
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
