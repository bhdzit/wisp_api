const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('./index');
const Torre = require('./torre');
class Sector extends Model {
  otherPublicField;
}

Sector.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT
  },
  torre: {
    type: DataTypes.NUMBER,
  },
  tipoAntena: {
    type:DataTypes.BOOLEAN,
  }
}, {
  sequelize,
});
Torre.hasMany(Torre, { foreignKey: 'id' });
Sector.belongsTo(Torre, { foreignKey: 'torre' });
Sector.addScope('defaultScope', {
  order: [['id', 'ASC']],
}, { override: true })

module.exports = Sector;