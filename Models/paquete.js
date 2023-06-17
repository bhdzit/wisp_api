const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
class Paquete extends Model {
  otherPublicField;
}
  Paquete.init({
    name: DataTypes.STRING,
    tx: DataTypes.STRING,
    rx: DataTypes.STRING,
    precio: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paquete',
  });
  module.exports = Paquete;
