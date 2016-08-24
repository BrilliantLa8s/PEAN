'use strict';

var model = require('../models/index');
var auth = require('../helpers/auth');
var oauth = require('../helpers/oauth');
var vars = require('../../config/vars');
var error = require('../../config/errors');
var cipher = require('../helpers/cipher');
var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();

// Get current user
router.get('/current', function(req, res){
  res.send(req.user)
});

// registration/login handling
router.post('/authenticate', function(req, res) {
  console.log(req.body.email)
  model.User.findOne({
    where:{email: req.body.email}
  }).then(function(user){
    // Register a new user
    if(req.body.type === 'register'){
      if(user){
        res.status(404).send(error.auth.reg.taken);
      } else if(req.body.password != req.body.password_confirmation) {
        res.status(404).send(error.auth.reg.mismatch)
      } else {
        model.User.create({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, vars.bcrypt.salt)
        }).then(function(user){
          auth.login(user.dataValues, req.body.password).then(function(token){
            res.status(200).send(token);
          }).catch(function(err){
            res.status(404).send(err);
          });
        }).catch(function(err){
          console.log(err)
          res.status(404).send(error.auth.reg.invalid);
        });
      }
    } else if(req.body.type === 'login'){
      if(user){
        auth.login(user.dataValues, req.body.password).then(function(token){
          res.status(200).send(token);
        }).catch(function(err){
          res.status(404).send(err);
        });
      } else {
        res.status(404).send(error.auth.log.notfound);
      };
    } else {
      console.log('No auth type was specified')
      res.status(404).send(error.auth.unable)
    }
  }).catch(function(err){
    res.send(err)
  });
});

// Oauth provider authorize/access
router.post('/authorize', function(req, res){
  oauth.authorize(req.headers.origin, req.body.provider)
  .then(function(resp){
    res.status(200).send(resp)
  }).catch(function(err){
    console.log(err);res.send(false);
  });
});

router.get('/callback', function(req, res){
  var origin = `${req.protocol}://${req.headers.host}`
  oauth.token(origin, req.query.provider, req.query.code)
  .then(function(obj){
    console.log(obj)
    model.Identity.create({
      provider: req.query.provider,
      accessToken: obj.access_token,
      userInfo: obj.user
    }).then(function(identity){
      var id = cipher.encrypt(`0000${identity.id}`)
      res.redirect(`/identity/${id}`);
    }).catch(function(err){console.log(err)});
  }).catch(function(err){
    console.log(err);res.send(false);
  });
});

module.exports = router;
