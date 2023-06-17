'use strict';
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('wisp', 'postgres', 'Hola1234.', {
  host: 'localhost',
  dialect:  'postgres'
});

module.exports = sequelize;
