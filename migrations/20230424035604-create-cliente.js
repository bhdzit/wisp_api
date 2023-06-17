'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente: {
        type: Sequelize.STRING
      },
      tel1: {
        type: Sequelize.STRING
      },
      tel2: {
        type: Sequelize.STRING
      },
      contrato:{
        type:Sequelize.BOOLEAN
      },
      lat:{
        type:Sequelize.STRING
      },
      lng:{
        type:Sequelize.STRING
      },
      paquete: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Paquetes',
          key: 'id'
        },
        allowNull: false

      },
      torre:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Torres',
          key: 'id'
        },
        allowNull: false

      },
      estatus:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
      },
      primer_pago:{
        type:Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};