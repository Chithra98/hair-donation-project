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

var usermethods = {};

usermethods.getAllUser = () => new Promise((resolve,
    reject) => {
        models.user.findAll()
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
  usermethods.getUserByUsername = (user) => new Promise((resolve,
    reject) => {
      sequelize.query('SELECT * FROM Users WHERE Users.username = :username ',
      { replacements: { username: [user] }, type: sequelize.QueryTypes.SELECT }
    ).then(user => {
      console.log(user);
      resolve(user);
    })
    .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

usermethods.findByUsername = (username) => new Promise((resolve,
  reject) => {
    var Username = username;
      sequelize.query("UPDATE Users SET verified = true WHERE Users.username = :username", { replacements: { username: [Username] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
          console.log("metadata :");
          resolve(metadata[1]);
    }).catch((err) =>{
      console.log("error inside usermethods :", err);
      reject(err);
    })
  
  })

  
  usermethods.setAdmno = (mesg,username) => new Promise((resolve,
  reject) => {
    sequelize.query("UPDATE Users SET lhadmno = :mesg WHERE Users.username = :username", { replacements: { username: [username], mesg:[mesg] }, type: sequelize.QueryTypes.UPDATE } ).then((metadata) => {
      resolve(metadata[1]);

    })
    .catch((err) =>{
      console.log(err);
    })
  })

module.exports = usermethods;