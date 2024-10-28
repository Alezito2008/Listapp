const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Usuario = require("./Usuarios");


const Amigos = sequelize.define('Amigos', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    amigoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    aceptado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false
})

module.exports = Amigos
