'use strict';
// require
var MongoClient = require('mongodb').MongoClient;

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
		// 1- remove the collection (if existing)
		collection.remove({}, function(err, removed){
			if (err) {
				exitWithError(err);
			}
			console.log(removed + " geek(s) removed !");

			// 2- insert geeks !
			collection.insert(geeks, {safe : true},	function(err, result) {
				if (err) {
					exitWithError(err);
				}
				console.log(result.length + " geek(s) inserted !");
				process.exit(0);
			});
		});
	});
});
