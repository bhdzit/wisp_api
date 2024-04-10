const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const OLT = require('./olt');
class Nap extends Model {
  otherPublicField;
}

Nap.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  colorNAP: {
    type: DataTypes.TEXT,
  },
  olt: {
    type: DataTypes.INTEGER,
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
  },
  colorPuerto: {
    type: DataTypes.TEXT,
  },

}, {
  sequelize,
});

OLT.hasMany(OLT, { foreignKey: 'id' });
Nap.belongsTo(OLT, { foreignKey: 'olt', as: "oltVO" });

module.exports = Nap;