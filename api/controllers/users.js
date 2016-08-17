'use strict';

var model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  model.User.all().then(function(users) {
    res.status(200).send(users);
  });
});

router.get('/:id', function(req, res){
  model.User.find({
    where: { id: req.params.id }
  }).then(function(user) {
    res.status(200).send(user);
  });
});

module.exports = router;