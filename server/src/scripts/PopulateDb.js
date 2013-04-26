'use strict';
// require
var MongoClient = require('mongodb').MongoClient;

// mongodb uri
var uri = require('../conf/conf').MONGO_URL;

// initial data
var geeks = require('./geeks.json');

MongoClient.connect(uri, function(err, db) {
	db.collection('geeks', function(err, collection) {
		// remove the collection (if existing)
		collection.remove({},function(err, removed){});
		// create it
		collection.insert(geeks, {safe : true},
			function(err, result) {
				if (err) {
					console.log('Something went wrong');
					process.exit(1);
				}
				console.log('Done');
				process.exit(0);
			});
	});
});
