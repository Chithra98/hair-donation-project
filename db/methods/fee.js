const Promise = require('bluebird');
var models = require('../models');
var Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
var sequelize ={};
const methods = require('../methods')

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var feemethods = {};
feemethods.getAllFee = () => new Promise(
  (resolve, reject) =>{
          sequelize.query("SELECT * FROM Fees WHERE paymentstatus=0;",{type: sequelize.QueryTypes.SELECT}).then((values) =>{
              console.log(values);
              resolve(values);
          })
          .catch((err) =>{
              console.log(err);
              reject(err)
          })
  })
feemethods.findFine = (monthname,studentid) => new Promise(
    (resolve, reject) =>{
      methods.monthtabmethods.dueDifference(monthname).then((values)=>{
        values = values*2;
        if(values<0)
        {}
        else{
      sequelize.query("UPDATE Fees SET fine = :values WHERE Student_id= :studentid AND paymentstatus=0;",{replacements:{values:[values[0]],studentid : [studentid] }, type: sequelize.QueryTypes.SELECT}).then((values) =>{
        console.log(values);
        resolve(values);
    })
    .catch((err) =>{
        console.log(err);
        reject(err)
      })
    }
    })
  
    .catch((err) =>{
    console.log(err)
    })

    })

   feemethods.createtable = (info) => {
        console.log('inside adding month details');
      
        return new Promise((resolve, reject) => {
          models.fee.create(info).then((model) => {
            resolve(model);
          })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }
feemethods.setPaid = (info) => new Promise(
  (resolve,reject) =>{
    sequelize.query("UPDATE Fees SET paymentstatus=1, fine=0 WHERE Month_id = :monthid AND lhadmno = :lhadmno",{replacements:{
     monthid : [info.Month_id], lhadmno : [info.lhadmno]
    },type: sequelize.QueryTypes.UPDATE}).
    then((values) =>{
      console.log(values[1])
      resolve(values[1])
    })
    .catch((err) =>{
      console.log(err)
      reject(err)
    })
  }
)
  feemethods.updatefees = (info, data) => new Promise((
  resolve,
  reject,
) => {
 /* models.fee.update(data, {
    where: {
      Monthid: info.Monthid,
    },
  })*/
  sequelize.query('UPDATE Fees SET Fees = :data WHERE Monthid = :monthid',{ replacements:{monthid : [info.Monthid], data:[data]}, type: sequelize.QueryTypes.UPDATE })
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
 feemethods.getfee = (monthid,studentid) => new Promise(
    (resolve, reject) =>{
            sequelize.query("SELECT fee FROM Fees WHERE Month_id=monthid AND Student_id=studentid").then((values) =>{
                console.log(values);
                resolve(values);
            })
            .catch((err) =>{
                console.log(err);
                reject(err)
            });
    });


   module.exports = feemethods; 