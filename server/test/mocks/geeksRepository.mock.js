'use strict';
var GeeksRepository = function() {
	
	var _insert = function(geek, callback) {
		// TODO insert into mongo collection
		callback();
	};

	var _find = function(query, callback) {
		// TODO find geeks from mongo collection
		var geeks = [{"name":"geek1"},{"name":"geek2"}];
		callback(geeks);
	};
	
	return {
		insert : _insert,
		find : _find
	};
}();

module.exports = GeeksRepository;