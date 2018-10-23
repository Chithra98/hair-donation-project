'use strict';

const bcrypt =  require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var Fee = sequelize.define('Fee', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type : DataTypes.STRING(20),
    },
    password: {
      type : DataTypes.STRING,
    },
    lhadmno: {
      type : DataTypes.STRING,
    },
    fee: {
        type : DataTypes.INTEGER,
    },
 
  
  });

  return Fee;
}
