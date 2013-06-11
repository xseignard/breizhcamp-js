'use strict';
// require
var MongoClient = require('mongodb').MongoClient,
	async = require('async');

// mongodb uri
var uri = require('../conf/conf').MONGO_URL;

// initial data
var geeks = require('./geeks.json');

var exitWithError = function(err) {
	console.log('Something went wrong !');
	console.log(err);
	process.exit(1);
};

MongoClient.connect(uri, function(err, db) {
	if (err) {
		exitWithError(err);
	}
	db.collection('geeks', function(err, collection) {
		if (err) {
			exitWithError(err);
		}
		async.series(
			[
				// 1- remove the collection (if existing)
				function(callback) {
					collection.remove({}, function(err, removed){
						callback(err, removed + " geek(s) removed !");
					});
				},
        
				// 2- insert geeks !
				function(callback) {
					collection.insert(geeks, {safe : true},	function(err, result) {
						callback(err, result.length + " geek(s) inserted !");
					});
				}
			],
			// final callback function
			function(err, results) {
				if (err) {
					exitWithError(err);
				}
				results.map(function(result) {
					console.log(result);
				});
				process.exit(0);
			}
		);
	});
});
