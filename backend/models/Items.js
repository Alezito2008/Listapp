const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const Item = sequelize.define('Items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marcado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    cantidadNecesitada: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    medida: {
        type: DataTypes.STRING(3)
    },
    listaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Item
