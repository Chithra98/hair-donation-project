const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
var sequelize ={};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var attendancemethods = {};

attendancemethods.getAllAttendance = () => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT * FROM attendance;").then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

attendancemethods.createtable = (info) => new Promise(
    (resolve,reject) =>{
 
        models.attendance.save(info).then(() =>{
            console.log('saved');

        })
        .catch((err) =>{
            console.log(err);
            reject(err);
        })
    }
)
    module.exports = attendancemethods; 