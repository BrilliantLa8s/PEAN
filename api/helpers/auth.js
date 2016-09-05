'use strict';

var config = require('../../config/app');
var vars = require('../../config/vars');
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
    var token = jwt.sign({info:user}, config.secret, {
      expiresIn: 1440 // expires in 24 hours
    });
    defer.resolve(token);
  } else {
    defer.reject(error.auth.log.wrong);
  }
  return defer.promise;
}

auth.update = function(user, password, body) {
  var defer = require('q').defer();
  if(body.type === 'attributes') {defer.resolve(body);}
  else if(bcrypt.compareSync(body.currentPassword, password)) {
    if(body.type === 'email'){
      user.email = body.email;
      user.token = jwt.sign({info:user}, config.secret, {
        expiresIn: 1440 // expires in 24 hours
      });
      defer.resolve(body);
    } else if(body.type === 'password'){
      if(auth.validate('password', body.newPassword)){
        body.password = bcrypt.hashSync(body.newPassword, vars.bcrypt.salt);
        defer.resolve(body)
      } else {
        defer.reject(error.auth.invalid.password);
      }
    } else {
      defer.reject(error.auth.unable);
    }
  } else {
    defer.reject(error.auth.change);
  }
  return defer.promise;
}

// Authenticate Requestspppppppp[]
auth.authenticateRequests = function(req, res, next){
  // Check for auth token on other api requests
  var token = req.headers.token
  if (token) {
    jwt.verify(token, config.secret, function(err, obj) {
      if (err) {res.status(401).send(err);}
      else {req.user = obj.info; next();};
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

auth.validate = function(type, string){
  if(type==='password')
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/.test(string);
}

module.exports = auth;
