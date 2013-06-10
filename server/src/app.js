'use strict';
var express = require('express'),
	app = express(),
	conf = require('./conf/conf'),
	GeeksRepository = require('./core/geeksRepository'),
	GeeksRoutes = require('./routes/geeksRoutes');

// configure geeks repository
var geeksRepository = new GeeksRepository(conf.MONGO_URL, 'geeks');
geeksRepository.connect();

// configure routes
var routes = new GeeksRoutes(geeksRepository);
app.post('/geek', routes.create);
app.get('/geek/likes/:like?', routes.likes);

// app conf
// development only : set a NODE_ENV=development env variable on your dev machine
// or run with NODE_ENV=development node app.js
app.configure('development', function(){
	app.use(express.static(__dirname + '/../../client/src'));
	app.use('/components', express.static(__dirname + '/../../client/components'));
});
// production only : run with NODE_ENV=production node app.js
app.configure('production', function(){
  app.use(express.static(__dirname + '/../../client/dist'));
});
app.use(express.bodyParser());

// shutdown hook
var cleanup = function () {
	console.log('geeks-backend is shutting down...');
	geeksRepository.close();
	process.exit();
};
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

// start server
var port = process.env.PORT || 9999;
app.listen(port);
console.log('geeks-backend listening on port %s', port);
