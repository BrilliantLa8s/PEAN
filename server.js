'use strict';

var bodyParser = require('body-parser');
var models = require('./api/models');
var express = require('express');
var app = express();

// Parse body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Client App Directory
app.use(express.static('client'));

// API Controllers
app.use('/api/posts', require('./api/controllers/posts'));

// Catchall Route
app.use(function(req, res){
  res.sendFile(__dirname + '/client/index.html')
});

// Serve Application
app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});
