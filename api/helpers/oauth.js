'use strict';

var config = require('../../config/app');
var error = require('../../config/errors');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var request = require('request');
var oauth = {};

oauth.authorize = function(origin, providerName){
  var defer = require('q').defer();
  var provider = require('../../config/oauth')[providerName];
  var params = [
    `client_id=${process.env[providerName+'_client_id']}&`,
    `redirect_uri=${origin}/api/auth/callback?provider=${providerName}&`,
    `response_type=${provider.responseType}&`,
    `scope=${provider.scope}`
  ];
  var url = `${provider.authUrl}${params.join('')}`;
  if(url){
    defer.resolve(url);
  } else {
    defer.reject();
  }
  return defer.promise;
}

oauth.token = function(origin, providerName, authCode){
  var defer = require('q').defer();
  var provider = require('../../config/oauth')[providerName];
  var params = {
    grant_type: provider.grantType,
    code: authCode,
    client_id: process.env[providerName+'_client_id'],
    client_secret: process.env[providerName+'_client_secret'],
    redirect_uri: `${origin}/api/auth/callback?provider=${providerName}`
  }
  request.post({url:provider.accessUrl, form:params}, function (err, resp, body) {
    var body = JSON.parse(body);
    // console.log(resp)
    if (err) {defer.reject(err);}
    else if (body.error) {
      defer.reject(body.error_description);
    } else {
      if (providerName !== 'facebook') {
        defer.resolve(body);
      } else {
        request.get(provider.data.url, {
          'auth':{'bearer': body.access_token}
        }, function(err, resp, bodie){
          if (err) {defer.reject(err);}
          else if (body.error) {
            defer.reject(body.error_description);
          } else {
            body.user = JSON.parse(bodie)
            defer.resolve(body);
          };
        });
      };
    };
  });
  return defer.promise;
}

module.exports = oauth;
