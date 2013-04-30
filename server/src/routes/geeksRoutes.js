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
			res.send(201);
		});
	};
	
	var _find = function(req, res) {
		var keywords = req.params.keywords;
		if (keywords) {
			geeksRepo.find(keywords, function(geeks) {
				res.send(200, geeks);
			});
		}
		else {
			res.send(400, {"message" : "request parameter needed : keywords"});
		}
	};

	return {
		create : _create,
		find : _find
	};

};

module.exports = GeeksRoutes;