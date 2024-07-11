const { Sequelize } = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize('Listapp', 'root', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize
