'use strict';
/**
 * Configuration store
 * @class Conf
 * @module conf
 */
var Conf = {
	/**
	 * Connection URL to mongodb
	 * @property MONGO_URL
	 * @type {String}
	 */
	MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/geeksDB'
};

module.exports = Conf;