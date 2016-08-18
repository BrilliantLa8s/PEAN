'use strict';

var model = require('../models/index');
var auth = require('../helpers/auth');
var vars = require('../../config/vars');
var error = require('../../config/errors');
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

module.exports = router;
