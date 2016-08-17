'use strict';

var jwt = require('jsonwebtoken');
var auth = {};

// login function
auth.login = function(user, formPassword) {
  var defer = require('q').defer();
  if (user.password != formPassword) {
    defer.reject('Authentication failed. Wrong password.');
  } else {
    var token = jwt.sign(user, 'superSecret', {
      expiresIn: 1440 // expires in 24 hours
    });
    defer.resolve(token);
  }
  return defer.promise;
}

// Authenticate Requests
auth.authenticateRequests = function(req,res,next) {
  // Catchall route
  if (req.originalUrl.split('/')[1] != 'api'){
    res.sendFile('index.html', {'root': 'client'});
  } else {
    // Allow public api requests
    var publicApiPaths = ['auth']
    if(publicApiPaths.indexOf(req.originalUrl.split('/')[2]) != -1){
      next();
    } else {
      // Check for auth token on other api requests
      var token = req.headers.token
      if(token) {
        jwt.verify(token, 'superSecret', function(err, obj) {
          if (err) {return res.status(401).send(err)}
          else {req.user = obj; next();};
        });
      } else {return res.status(401).send('missing token')};
    };
  };
}

module.exports = auth;
