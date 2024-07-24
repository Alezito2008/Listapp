const { DataTypes } = require('sequelize')
const sequelize = require('../database/database');
const Lista = require('./Listas');

const Usuario = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [3],
        }
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
        validate: {
            len: [3]
        }
    },
    administrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Usuario.belongsToMany(Lista, { through: 'compartidos', onDelete: 'CASCADE' });
Lista.belongsToMany(Usuario, { through: 'compartidos', onDelete: 'CASCADE' });

module.exports = Usuario
