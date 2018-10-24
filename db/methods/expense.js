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
var methods = require('../methods')

var expensemethods = {};

expensemethods.findTotal = (monthid) => new Promise(
    (resolve, reject) =>{
      var Monthid=monthid;
            sequelize.query("UPDATE Expenses SET Total=Electricity+Mess+Water+Rent+CCF WHERE Monthtabs.Monthid= :monthid", { replacements: { monthid: [Monthid] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          resolve(metadata[1]);
            console.log(metadata);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

expensemethods.findOneDay = (monthid) => new Promise(
    (resolve, reject) =>{
      var Monthid=monthid;
      var Totalattendance=methods.attendancemethods.findTotal(monthid);
            sequelize.query("UPDATE Expenses SET Oneday= Total/ :Totalattendance WHERE Expenses.Monthid= :monthid", { replacements: { monthid: [Monthid] ,}, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          resolve(metadata[1]);
            console.log(metadata);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            });
    });

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