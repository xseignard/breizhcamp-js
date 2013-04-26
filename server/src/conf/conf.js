'use strict';
var Conf = {
	// mongodb url
	MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/geeksDB'
};

module.exports = Conf;