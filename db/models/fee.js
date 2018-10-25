'use strict';

module.exports = (sequelize, DataTypes) => {
  var Fee = sequelize.define('Fee', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    Student_id : {
      type: DataTypes.INTEGER(),
      unique:"compositeIndex",
    },
    Month_id : {
      type: DataTypes.INTEGER(),
      unique:"compositeIndex",
    },
    lhadmno: {
      type : DataTypes.STRING(20),
    },
    expense:{
      type: DataTypes.INTEGER(),
    },
    fine:{
      type: DataTypes.INTEGER(),

    },
    paymentstatus:{
      type: DataTypes.INTEGER(),
      allowNull: false, 
      defaultValue: 0,
    },
    fee: {
        type : DataTypes.INTEGER(),
    }
  });
  Fee.associate = function (models) {
    models.Fee.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'Student_id',
        allowNull: false
        // allowNull: false -- already defined
      },
    });
  };
 
  Fee.associate = function (models) {
    models.Fee.belongsTo(models.Monthtab, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'Month_id',
        allowNull: false
        // allowNull: false -- already defined
      },
    });
  };



  return Fee;
}
