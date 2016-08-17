'use strict';

var model = require('../../api/models');

model.User.create({
  email: 'test@user.com',
  username: 'TestUser',
  password: 'password'
});

model.User.create({
  email: 'test@admin.com',
  username: 'TestAdmin',
  password: 'password',
  admin: true
})
