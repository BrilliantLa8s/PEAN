'use strict';

var model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  model.Post.all().then(function(posts) {
    res.status(200).send(posts);
  });
});

router.get('/:id', function(req, res) {
  model.Post.find({
    where: { id: req.params.id }
  }).then(function(post) {
    res.status(200).send(post);
  });
});

module.exports = router;
