const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Grupos = sequelize.define('Grupos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            len: [3, 25]
        }
    },
    creadorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Grupos;
