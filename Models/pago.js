const { Sequelize, DataTypes, Model, Op } = require('sequelize');
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
Pago.addScope('defaultScope', {
  where: {
    [Op.or]: [
      { estatus: true},
      { estatus: null }
    ]
    
  }, order: [['id', 'ASC']],
}, { override: true });
Cliente.hasMany(Cliente, { foreignKey: 'id' });
Pago.hasMany(Extra,{ foreignKey: 'pago', as:"extraVO" })
Pago.belongsTo(Cliente, { foreignKey: 'cliente', as:"clienteVO" });
Pago.belongsTo(Paquete, { foreignKey: 'paquete', as:"paqueteVO" });


module.exports = Pago;




