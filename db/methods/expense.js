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

var expensemethods = {};

expensemethods.findTotal = (monthid) => new Promise(
    (resolve, reject) =>{
            sequelize.query("UPDATE Expenses SET Total=Electricity+Mess+Water+Rent+CCF WHERE Monthid=monthid").then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

expensemethods.findOneDay = (monthid,totalattnd) => new Promise(
    (resolve, reject) =>{
            sequelize.query("UPDATE Expenses SET Oneday= Total/totalattnd WHERE Monthid=monthid").then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

   expensemethods.createtable = (info) => {
        console.log('inside adding month details');
      
        return new Promise((resolve, reject) => {
          models.expense.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      };

  expensemethods.updateUsers = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.expense.update(data, {
    where: {
      Monthid: info.Monthid,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(new Error());
        // throw ('err')
      }
    }).catch((error) => {
      reject(error);
    });
});

   module.exports = expensemethods; 