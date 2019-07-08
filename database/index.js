const Sequelize = require('sequelize');
const DB_CONFIG=require('config').get('DB_SERVER');
module.exports = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USERNAME, DB_CONFIG.PASSWORD, {
    host: DB_CONFIG.HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});