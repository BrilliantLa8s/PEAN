'use strict';

var cipher = require('../helpers/cipher');
var model = require('../models/index');
var express = require('express');
var router = express.Router();

// finish saving a new identity
router.post('/finish', function(req, res) {
  var id = cipher.decrypt(req.body.id)
  model.Identity.findById(id)
  .then(function(identity) {
    identity.update({UserId:req.user.id})
    res.status(200).send('Identity added');
  }).catch(function(err){
    console.log(err)
    res.status(400).send('Couldn\'t add identity')
  });
});

// delete an identity
router.delete('/:provider', function (req, res) {
  model.Identity.destroy({
    where: {
      UserId: req.user.id,
      provider: req.params.provider
    }
  }).then(function(){
    res.status(200).send('Identity Removed');
  }).catch(function(err){
    console.log(err);
    res.status(400).send('Couldn\'t remove identity')
  });
});

module.exports = router;
