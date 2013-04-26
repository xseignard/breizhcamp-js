'use strict';
var restify = require('restify'),
	geeksRepository = require('./core/geeksRepository')(),
	GeeksRoutes = require('./routes/geeksRoutes');

// create server
var server = restify.createServer({
	"name" : "geeks-backend"
});
server.use(restify.queryParser());

// configure routes
var routes = new GeeksRoutes(geeksRepository);
server.post('/geek', routes.create);
server.get('/geek/search', routes.find);

// start server
var port = process.env.PORT || 9999;
server.listen(port, function() {
	console.log('%s listening at %s', server.name, server.url);
});
