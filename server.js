'use strict';

var bodyParser = require('body-parser');
var models = require('./api/models');
var auth = require('./api/helpers/auth');
var express = require('express');
var app = express();

// Parse body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Client App Directory
app.use(express.static('client'));

// Route auth check/catchall middleware
app.use(function(req, res, next) {
  auth.authenticateRequests(req, res, next)
});

// API Controllers
app.use('/api/auth', require('./api/controllers/auth'));
app.use('/api/users', require('./api/controllers/users'));
app.use('/api/posts', require('./api/controllers/posts'));
app.use('/api/identities', require('./api/controllers/identities'));

// Serve Application
app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});
