const { Sequelize, DataTypes, Model } = require('sequelize');
const  sequelize = require('./index');
const bcrypt = require('bcrypt');
class User extends Model {
    otherPublicField;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.TEXT,
    },
    password: {
        type: DataTypes.TEXT,
    }

}, {
    sequelize,
    timestamps: false,

    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

User.prototype.validPassword = async function (password) {
    console.log(password);
    return await bcrypt.compare(password, this.password);
}

module.exports = User;