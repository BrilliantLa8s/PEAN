'use strict';

var model = require('../../api/models');
var vars = require('../../config/vars');
var bcrypt = require('bcryptjs');

model.User.create({
  email: 'test@user.com',
  username: 'TestUser',
  password: bcrypt.hashSync('password', vars.bcrypt.salt)
});

model.User.create({
  email: 'test@admin.com',
  username: 'TestAdmin',
  password: bcrypt.hashSync('password', vars.bcrypt.salt),
  admin: true
})
