'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Naps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      olt: {
        type: Sequelize.INTEGER,
        references: {
          model: 'OLTs',
          key: 'id'
        },
      },
      puerto: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Naps');
  }
};