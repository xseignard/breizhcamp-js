'use strict';
var express = require('express'),
	app = express(),
	GeeksRepository = require('./core/geeksRepository'),
	GeeksRoutes = require('./routes/geeksRoutes');

// configure routes
var geeksRepository = new GeeksRepository();
var routes = new GeeksRoutes(geeksRepository);
app.post('/geek', routes.create);
app.get('/geek/search', routes.find);

// start server
var port = process.env.PORT || 9999;
app.listen(port);
console.log('geeks-backend listening on port %s', port);

