const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcrypt');
class Torre extends Model {
  otherPublicField;
}

Torre.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.TEXT,
  },
  altura: {
    type: DataTypes.TEXT,
  },
  lat: {
    type: DataTypes.TEXT,
  },
  lng: {
    type: DataTypes.TEXT,
  }

}, {
  sequelize,
});

module.exports = Torre;