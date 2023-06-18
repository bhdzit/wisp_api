'use strict';
require('dotenv').config();
const DB = process.env.DB;
const user = process.env.USER;
const pass = process.env.PASS;
const dbtype = process.env.DBTYPE;
const host = process.env.HOST;
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DB, user, pass, {
  host: host,
  dialect:  dbtype
});

module.exports = sequelize;
