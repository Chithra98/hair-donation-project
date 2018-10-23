
'use strict';

const bcrypt =  require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
    roomno: {
      type: DataTypes.INTEGER(),
      defaultValue: 0

    },
    department :{
      type: DataTypes.STRING,

    },
    course :{
      type: DataTypes.STRING,
    },
    semester : {
      type: DataTypes.STRING,
    },
    category :{
      type: DataTypes.STRING,
    },
    verified : {
      type : DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    }
  });

  User.hook('beforeCreate' ,function(user) {
   user.password= bcrypt.hashSync(user.password,bcrypt.genSaltSync(10));
   
  }
  );
  
  User.comparePassword = function(pw,user) {
    
    
      console.log('yes');
      console.log(user.password);
      console.log(pw);
      /*bcrypt.hash(pw, 10, function(err, hash) {
        console.log(hash);
        pw = hash;
       
      });*/
    var isMatch=bcrypt.compare(pw, user.password);
    console.log(isMatch);
    return isMatch;
      
      
      
  }
  return User;
}


