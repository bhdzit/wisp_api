const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
class Nap extends Model {
  otherPublicField;
}

Nap.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  referencia: {
    type: DataTypes.TEXT,
  },
  puerto: {
    type: DataTypes.TEXT,
  },
  numero: {
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

module.exports = Nap;