const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')
const Lista = require('./Listas')

const Usuario = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
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

Usuario.hasMany(Lista, {
    foreignKey: 'creadorId',
    sourceKey: 'id',
    onDelete: 'cascade'
})

Lista.belongsTo(Usuario, {
    foreignKey: 'creadorId',
    targetKey: 'id',
    onDelete: 'cascade'
})

Lista.belongsToMany(Usuario, {
    through: 'Usuario_Listas'
})

Usuario.belongsToMany(Lista, {
    through: 'Usuario_Listas'
})

module.exports = Usuario
