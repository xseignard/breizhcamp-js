'use strict';
// require
var MongoClient = require('mongodb').MongoClient,
	gm = require('googlemaps'),
	async = require('async');

// mongodb uri
var uri = require('../conf/conf').MONGO_URL;

var exitWithError = function(err) {
	console.log('Something went wrong !');
	console.log(err);
	process.exit(1);
};

var geeksCollection;

var addGeoData = function(geek, callback) {
    if (geek.city && geek.city !== '') {					
    	gm.geocode(geek.city, function(err, cities){
	    	if (err) {
				exitWithError(err);
	    	}
        	if (cities.results && cities.results.length > 0) {
    			var geodata = cities.results[0];
    			geeksCollection.update({'_id' : geek._id}, { $set : {'geodata' : geodata}}, { upsert: true }, function(err, data) {
    			    if (err) {
				        exitWithError(err);
	    	        }
    			    console.log('Geek %s updated !', geek.firstname);
    			    callback();
    			});
    		} else {
    		    callback();
    		} 
    	});
   	} else {
   	    callback();
   	}
};

MongoClient.connect(uri, function(err, db) {
	if (err) {
		exitWithError(err);
	}
	db.collection('geeks', function(err, collection) {
		if (err) {
			exitWithError(err);
		}
		geeksCollection = collection;
        geeksCollection.find().toArray(function(err, geeks){
            async.each(geeks, addGeoData, function(err) {
                if (err) {
		        	exitWithError(err);
		        }
                console.log('Done !');
                process.exit(0);                
            });
        });
	});
});

