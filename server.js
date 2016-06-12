var express = require('express');
var app = express();

app.use(express.static('client'));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
