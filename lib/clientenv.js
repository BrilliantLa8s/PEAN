var fs = require('fs');
var obj = {};
var arr, i;

fs.readFile('./.env', function(err, data) {
  // stringify data & keep line breaks consistant
	data = data.toString().replace(/(\r\n|\r)/gm,'\n').split('\n');

  // for each value in data array
	for (i = 0; i < data.length; i++) {
    if(data[i].substring(0, 6) === 'client') {
      // split value into array
  		arr = data[i].split("=");
      // object key/value pairs
  		obj[arr[0]] = arr[1];
    }
	}
  // stringify object
	data = JSON.stringify(obj, null, 2);

  // write file to client directory
	fs.writeFile('./client/build/env.js', 'const env = '+data, function(err) {
		if(err) console.log(err);
  });

});
