const Sequelize = require('sequelize');
require('dotenv').config({path:'variables.env'});
var pg = require('pg');
pg.defaults.ssl = true;

module.exports = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASS,{
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
      },
    pool: {
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        timestamps:false
    },
    ssl: true
});
