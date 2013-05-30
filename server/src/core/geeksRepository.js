'use strict';
/**
 * Repository pattern to CRUD geeks. 
 * @class GeeksRepository
 * @constructor
 * @module core
 */
var GeeksRepository = function(dbUrl, collectionName) {
	
	var MongoClient = require('mongodb'), db, coll;

	/**
	 * Connect to the db.
	 * @param callback {object} - the called function once connected
	 */
	var _connect = function() {
		console.log('Opening db connection : %s', dbUrl);
		MongoClient.connect(dbUrl, function(err, database) {
			if (err) {console.log(err); throw err;}
			db = database;
			db.collection(collectionName, function(err, collection) {
				if (err) throw err;
				coll = collection;
			});
		});
	};

	/**
	 * Close the connection
	 */
	var _close = function() {
		console.log('Closing db connection...');
		db.close(function(err, result) {
			if (err) throw err;
			console.log('Done');
		});
	};

	/**
	 * Insert a geek
	 * @method insert
	 * @param {Object} geek - the geek to insert, not checked against a particular schema
	 * @param {Function} callback - function to be called with error and success objects in param after the insert
	 */
	var _insert = function(geek, callback) {
		coll.insert(geek, function(err, item) {
			if (err) throw err;
			callback(err, item);
		});
	};

	/**
	 * Find a geek
	 * @method find
	 * @param {Object} query - query to search against
	 * @param {Function} callback - function to be called with error and data objects in param after the find
	 */
	var _find = function(query, callback) {
		coll.find(query).toArray(function(err, items) {
			if (err) throw err;
			callback(items);
		});
	};
	
	return {
		connect : _connect,
		close : _close,
		insert : _insert,
		find : _find
	};
};

module.exports = GeeksRepository;
