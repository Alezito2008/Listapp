const { Sequelize } = require('sequelize')

require('dotenv').config()

console.log(process.env.MYSQL_PASSWORD)
const sequelize = new Sequelize('Listapp', 'root', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = sequelize
