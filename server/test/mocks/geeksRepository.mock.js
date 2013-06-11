'use strict';
var GeeksRepository = function() {
	
	var _insert = function(geek, callback) {
		callback();
	};

	var _find = function(query, limit, skip, callback) {
		var geek1 = {"NOM": "Prunier", "PRENOM": "Sebastien", "EMAIL": "seb@my-domain.com", "VILLE": "Nantes", "LIKES" : ["everything"], "HATES": ["nothing"]};
		var geek2 = {"NOM": "Seignard", "PRENOM": "Xavier", "EMAIL": "xav@my-domain.com", "VILLE": "Nantes", "LIKES" : ["everything"], "HATES": ["nothing"]};
		var geeks = [geek1, geek2];
		callback(geeks);
	};
	
	return {
		insert : _insert,
		find : _find
	};
}();

module.exports = GeeksRepository;
