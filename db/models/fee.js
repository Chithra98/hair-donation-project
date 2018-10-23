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


  return Fee;
}
