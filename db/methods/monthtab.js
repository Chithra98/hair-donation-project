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

var monthtabmethods = {};

monthtabmethods.dueDifference = (monthid) => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT DATEDIFF(now(),(SELECT Duedate FROM Monthtabs WHERE Monthid=monthid)) FROM Monthtabs").then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            })
    })

   monthtabmethods.createtable = (info) => {
        console.log('inside adding month details');
      
        return new Promise((resolve, reject) => {
          models.monthtab.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }

  monthtabmethods.updateUsers = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.monthtab.update(data, {
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


   module.exports = monthtabmethods; s

   