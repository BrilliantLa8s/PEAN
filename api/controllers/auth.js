'use strict';

var model = require('../models/index');
var auth = require('../helpers/auth');
var express = require('express');
var router = express.Router();

// Get current jwt payload object
router.get('/current', function(req, res){
  res.status(200).send(req.user)
});

// registration/login handling
router.post('/authenticate', function(req, res) {
  model.User.findOne({
    where:{email: req.body.email}
  }).then(function(user){
    // Register a new user
    if(req.body.type === 'register'){
      if(user){
        console.log('already registered')
        res.status(404).send('This email address is already registered');
      } else {
        model.User.create({
          email: req.body.email,
          password: req.body.password
        }).then(function(user){
          auth.login(user.dataValues, req.body.password).then(function(resp){
            res.status(200).send('User is registered and logged in');
          }).catch(function(err){
            console.log(err)
          });
        }).catch(function(err){
          res.status(404).send('Could not register user');
        });
      }
    } else if(req.body.type === 'login'){
      if(user){
        auth.login(user.dataValues, req.body.password).then(function(token){
          res.status(200).send(token);
        }).catch(function(err){
          res.status(404).send('Could not log user in');
        });
      } else {
        res.status(404).send('This email address is not registered');
      };
    } else {
      console.log('No auth type was specified')
      res.status(404).send('Unable to process your request')
    }
  }).catch(function(err){
    res.send(err)
  });
});

module.exports = router;
