'use strict';
// require
var MongoClient = require('mongodb').MongoClient,
	async = require('async');

// mongodb uri
var uri = require('../conf/conf').MONGO_URL;

// initial data
var geeks = require('./geeks.json');

MongoClient.connect(uri, function(err, db) {
	db.collection('geeks', function(err, collection) {
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
					console.log('Something went wrong');
					process.exit(1);
				}
				results.map(function(result) {
					console.log(result);
				});
				process.exit(0);
			}
		);
	});
});
