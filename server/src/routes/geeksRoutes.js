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
		var like = req.params.like || "";
		var query = {"likes" : like};
		geeksRepo.find(query, function(geeks) {
			res.status(200).send(geeks);
		});
	};

	return {
		create : _create,
		likes : _likes
	};

};

module.exports = GeeksRoutes;
