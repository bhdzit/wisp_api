'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paquete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'Paquetes',
          key: 'id'
        },
        allowNull: false

      },
      costo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      referencia: {
        type: Sequelize.STRING,
      },
      cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:  'Clientes',
          key: 'id'
        },
        allowNull: false
      },
      mesPagado: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      estatus: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Pagos');
  }
};