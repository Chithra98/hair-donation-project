const User = {};
User.usermethods=require('./user');
User.attendancemethods = require('./attendance');
User.monthtabmethods = require('./monthtab');

module.exports = User;