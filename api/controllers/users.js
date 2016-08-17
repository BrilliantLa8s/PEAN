'use strict';

var model = require('../models/index');
var express = require('express');
var router = express.Router();

// Get all users
router.get('/', function(req, res){
  model.User.all().then(function(users) {
    res.status(200).send(users);
  });
});

// Get user profile
router.get('/:id', function(req, res){
  model.User.find({
    where: { id: req.params.id }
  }).then(function(user) {
    res.status(200).send(user);
  });
});

module.exports = router;
