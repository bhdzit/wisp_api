const {  DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const Paquete = require('./paquete');
const Torre = require('./torre');
class Cliente extends Model {
  otherPublicField;
}
Cliente.init({
  cliente: DataTypes.STRING,
  tel1: DataTypes.STRING,
  contrato : DataTypes.BOOLEAN,
  tel2: DataTypes.STRING,
  paquete: DataTypes.INTEGER,
  torre: DataTypes.INTEGER,
  lat: DataTypes.STRING,
  lng: DataTypes.STRING,
  estatus: DataTypes.BOOLEAN,
  primer_pago: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Cliente',
});

Cliente.addScope('defaultScope', {
  where: {
    estatus: true
  }, order: [['id', 'ASC']],
}, { override: true });

Cliente.addScope('activeUsers', {
  where: {
    estatus: null
  }, order: [['id', 'ASC']],
}, { override: true });
Torre.hasMany(Torre, { foreignKey: 'id'});
Paquete.hasMany(Paquete, { foreignKey: 'id'});
Cliente.belongsTo(Torre, { foreignKey: 'torre', as:"torresVO"});
Cliente.belongsTo(Paquete, { foreignKey: 'paquete', as:"paqueteVO"});

module.exports = Cliente;
