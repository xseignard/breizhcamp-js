'use strict';
/**
 * Repository pattern to CRUD geeks. 
 * @class GeeksRepository
 * @constructor
 * @module core
 */
var GeeksRepository = function() {
	
	/**
	 * Insert a geek
	 * @method insert
	 * @param {Object} geek - the geek to insert, not checked against a particular schema
	 * @param {Function} callback - function to be called with error and success objects in param after the insert
	 */
	var _insert = function(geek, callback) {
		// TODO insert into mongo collection
		callback();
	};

	/**
	 * Find a geek
	 * @method find
	 * @param {Object} query - query to search against
	 * @param {Function} callback - function to be called with error and data objects in param after the find
	 */
	var _find = function(query, callback) {
		// TODO find geeks from mongo collection
		var geeks = [{"name":"geek1"},{"name":"geek2"}];
		callback(geeks);
	};
	
	return {
		insert : _insert,
		find : _find
	};
};

module.exports = GeeksRepository;