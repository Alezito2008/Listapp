const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')
const Item = require('./Items')

const Lista = sequelize.define('Listas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

Lista.hasMany(Item, {
    foreignKey: 'listaId',
    sourceKey: 'id',
    onDelete: 'cascade'
})

Item.belongsTo(Lista, {
    foreignKey: 'listaId',
    targetKey: 'id',
    onDelete: 'cascade'
})

module.exports = Lista
