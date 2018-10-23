'use strict';


module.exports = (sequelize, DataTypes) => {
  var Expense = sequelize.define('Expense', {
    Monthid: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    Electricity: {
      type : DataTypes.INTEGER(),
    },
    Water: {
        type : DataTypes.INTEGER(),
    },
    Mess: {
        type : DataTypes.INTEGER(),
    },  
    Rent: {
        type : DataTypes.INTEGER(),
    },
    CCF: {
        type : DataTypes.INTEGER(),
    },
    Total: {
        type : DataTypes.INTEGER(),
    },
    Oneday: {
        type : DataTypes.FLOAT(),
    },
    
  
  });

  return Expense;
}