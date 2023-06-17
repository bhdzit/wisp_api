const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const Cliente = require('./cliente');
const Paquete = require('./paquete');
const Extra = require('./extra');
class Pago extends Model {
  otherPublicField;
}
Pago.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  paquete: {
    type: DataTypes.NUMBER,
  },
  costo: {
    type: DataTypes.TEXT,
  },
  referencia: {
    type: DataTypes.TEXT,
  },
  cliente: {
    type: DataTypes.NUMBER,
  },
  mesPagado: {
    type: DataTypes.TEXT,
  },
  estatus: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'Pago',
});

Cliente.hasMany(Cliente, { foreignKey: 'id' })
Pago.hasMany(Extra,{ foreignKey: 'pago', as:"extraVO" })
Pago.belongsTo(Cliente, { foreignKey: 'cliente', as:"clienteVO" });
Pago.belongsTo(Paquete, { foreignKey: 'paquete', as:"paqueteVO" });
Pago.addScope('defaultScope', {
  order: [['id', 'ASC']],
}, { override: true })

module.exports = Pago;




