'use strict';

const bcrypt =  require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var Attendance = sequelize.define('Attendance', {
    Monthid: {
      type: DataTypes.INTEGER(),
    },
    Studentid: {
      type : DataTypes.STRING(20),
    },
    Attendance: {
      type : DataTypes.INTEGER(),
    },
 
  
  });

  return Attendance;
}