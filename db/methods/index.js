const User = {};

User.usermethods=require('./user');
User.attendancemethods = require('./attendance');
User.monthtabmethods = require('./monthtab');
User.attmethods = require('./get_att');

module.exports = User;