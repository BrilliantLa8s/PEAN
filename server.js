var express = require('express');
var models = require('./api/models');
var app = express();

app.use(express.static('client'));
app.use('/api/vendor', express.static('bower_components'));


// API Controllers
app.use('/api/posts', require('./api/controllers/posts'));

// Serve app
app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});
