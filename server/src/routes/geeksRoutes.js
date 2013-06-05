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
		var query = req.params.like ? {"likes": req.params.like} : {};
		var limit = req.query.limit || "12";
		var skip = req.query.skip || "0";
		geeksRepo.find(query, parseInt(limit, 10), parseInt(skip, 10), function(geeks) {
			res.status(200).send(geeks);
		});
	};

	return {
		create : _create,
		likes : _likes
	};

};

module.exports = GeeksRoutes;
