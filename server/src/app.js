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
app.get('/geek/likes/:like', routes.likes);

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

