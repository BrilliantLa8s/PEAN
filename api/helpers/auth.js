'use strict';

var jwt = require('jsonwebtoken');
var auth = {};

// whitelist public routes
var publicApiPaths = ['auth']

// login function
auth.login = function(user, formPassword) {
  var defer = require('q').defer();
  if (formPassword === undefined) defer.reject('Enter your password')
  if (user.password != formPassword) {
    defer.reject('Wrong credentials. Try again');
  } else {
    var token = jwt.sign(user, 'superSecret', {
      expiresIn: 1440 // expires in 24 hours
    });
    defer.resolve(token);
  }
  return defer.promise;
}

// Authenticate Requests
auth.authenticateRequests = function(req, res, next){
  // Check for auth token on other api requests
  var token = req.headers.token
  if (token) {
    jwt.verify(token, 'superSecret', function(err, obj) {
      if (err) {res.status(401).send(err);}
      else {req.user = obj; next();};
    });
  } else {
    // Catchall route for non-api routes
    if (req.originalUrl.split('/')[1] != 'api'){
      res.sendFile('index.html', {'root': 'client'});
    // Allow public api requests
    } else if(publicApiPaths.indexOf(req.originalUrl.split('/')[2]) != -1) {
      next();
    } else {
      res.status(401).send('missing token');
    }
  }
};

module.exports = auth;
