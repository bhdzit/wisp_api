'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Clientes',"nap", {
      type: Sequelize.INTEGER,
      references: {
        model: 'Naps',
        key: 'id'
      }
    });

    await queryInterface.addColumn('Clientes',"olt",       
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'OLTs',
        key: 'id'
      }
    });

    await queryInterface.addColumn('Clientes',"tipoConexion",       
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue:1

    });

    await queryInterface.addColumn('Clientes',"servicioExtra",       
    {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue:false
    });

    await queryInterface.addColumn('Clientes',"usuario",       
    {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Clientes',"password",       
   {
      type: Sequelize.STRING,
      allowNull: true
    });




  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clientes',"nap");
    await queryInterface.removeColumn('Clientes',"olt");
    await queryInterface.removeColumn('Clientes',"tipoConexion");
    await queryInterface.removeColumn('Clientes',"servicioExtra");
    await queryInterface.removeColumn('Clientes',"usuario");
    await queryInterface.removeColumn('Clientes',"password");
  }

};


/* 


,
      



,
*/