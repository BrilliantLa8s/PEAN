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
router.get('/:id', function(req, res){
  model.User.findOne({
    attributes:{exclude:['password']},
    where:{id:req.params.id}
  }).then(function(user) {
    res.status(200).send(user);
  });
});

module.exports = router;
