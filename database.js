const mysql = require('mysql2/promise')
const {database} = require('./keys')

const pool = mysql.createPool(database)
console.info('Connected to DB')

module.exports = pool