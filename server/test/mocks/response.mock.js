'use strict';
var Response = function() {
    var _data, _statusCode;

    var _send = function(code, responseData) {
		_statusCode = code;
		_data = responseData;
    };

    var _getData = function() {
		return _data;
    };

    var _getStatus = function() {
		return _statusCode;
    };

    return {
		send      : _send,
		getData   : _getData,
		getStatus : _getStatus
    };
};

module.exports = Response;