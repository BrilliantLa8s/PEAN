'use strict';

var model = require('../models/index');
var auth = require('../helpers/auth');
var express = require('express');
var router = express.Router();

// Get all users
router.get('/', function(req, res){
  model.User.findAll({
    attributes:{exclude:['password']}
  }).then(function(users) {
    res.status(200).send(users);
  });
});

// Get user by parameter
router.get('/profile', function(req, res){
  model.User.findOne({
    attributes:{exclude:['password']},
    where:{id:req.user.id},
    include:[model.Identity]
  }).then(function(user) {
    res.status(200).send(user);
  });
});

router.put('/update', function(req, res){
  if(req.body.type){
    model.User.findOne({
      where:{id:req.user.id}
    }).then(function(user) {
      auth.update(req.user, user.password, req.body)
      .then(function(changes){
        user.updateAttributes(changes)
        .then(function(user){
          res.status(200).send(req.user)
        }).catch(function(err){
          res.status(404).send(err.errors[0].message)
        })
      }).catch(function(err){
        res.status(404).send(err)
      })
    });
  } else {res.status(400).send('missing type')}
});

module.exports = router;
