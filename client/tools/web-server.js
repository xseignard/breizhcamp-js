var express = require('express'),
	app = express();

app.use(express.static(__dirname + '/../src'));
app.use('/components', express.static(__dirname + '/../components'));
app.use('/test', express.static(__dirname + '/../test'));
app.use(express.bodyParser());

var port = process.env.PORT || 8000;
app.listen(port);
console.log('geeks-backend listening on port %s', port);
