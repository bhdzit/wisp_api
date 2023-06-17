const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const Pago = require('./pago');
class Extra extends Model {
  otherPublicField;
}
Extra.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  costo: {
    type: DataTypes.TEXT,
  },
  pago:{
    type: DataTypes.NUMBER
  }
}, {
  sequelize,
  modelName: 'Extra',
});

Extra.addScope('defaultScope', {
  order: [['id', 'ASC']],
}, { override: true })

module.exports = Extra;


