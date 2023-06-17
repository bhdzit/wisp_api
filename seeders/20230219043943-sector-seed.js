'use strict';


const Torre = require('../Models/torre');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
    */
    let sectores=[];

      for(let i=1;i<=100;i++){
        sectores.push({
          id:i,
          name:"Sector "+i,
          torre: i,
          tipoAntena:false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }    
    return queryInterface.bulkInsert('Sectors', sectores);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Sectors', null, {});
  }
};
