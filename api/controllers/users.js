'use strict';

var model = require('../models/index');
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

module.exports = router;
