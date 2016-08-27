'use strict';

var config = require('../../config/app');
var error = require('../../config/errors');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var auth = {};

// whitelist public routes
var publicApiPaths = ['auth']

// login function
auth.login = function(user, formPassword) {
  var defer = require('q').defer();
  if(bcrypt.compareSync(formPassword, user.password)) {
    delete user.password
    var token = jwt.sign(user, config.secret, {
      expiresIn: 1440 // expires in 24 hours
    });
    defer.resolve(token);
  } else {
    defer.reject(error.auth.log.wrong);
  }
  return defer.promise;
}

// Authenticate Requests
auth.authenticateRequests = function(req, res, next){
  // Check for auth token on other api requests
  var token = req.headers.token
  if (token) {
    jwt.verify(token, config.secret, function(err, obj) {
      if (err) {res.status(401).send(err);}
      else {req.user = obj; next();};
    });
  } else {
    if (process.env.DEV_USER) {
      req.user = {
        email: 'dev@user.com',
        username: 'DevUser',
        admin: false,
        id: 1
      };
    }
    // Catchall route for non-api routes
    if (req.originalUrl.split('/')[1] != 'api'){
      res.sendFile('index.html', {'root': 'client'});
    // Allow public api requests
    } else if (publicApiPaths.indexOf(req.originalUrl.split('/')[2]) != -1) {
      next();
    } else if (req.user) {
      next();
    } else {
      res.status(401).send(error.auth.log.token);
    }
  }
};

module.exports = auth;
