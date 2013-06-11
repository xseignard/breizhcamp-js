'use strict';
/**
 * Routes of the API 
 * @class GeeksRoutes
 * @constructor
 * @param {GeeksRepository} geeksRepo - the repo
 * @module routes
 */
var GeeksRoutes = function(geeksRepo) {

	var _create = function(req, res) {
		geeksRepo.insert(req.body, function() {
			res.status(201).send();
		});
	};
	
	var _likes = function(req, res) {
		// TODO write the code that search geeks through the geeksRepo and return them in the response
	};

	return {
		create : _create,
		likes : _likes
	};

};

module.exports = GeeksRoutes;
