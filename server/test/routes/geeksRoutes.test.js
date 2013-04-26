'use strict';
var assert = require('assert'),
	GeeksRoutes = require('../../src/routes/geeksRoutes'),
	// mock repo
	geeksRepository = require('../mocks/geeksRepository.mock'),
	// mock http response
	Response = require('../mocks/response.mock'),
	// tested module
	routes = new GeeksRoutes(geeksRepository);

// TODO take a look at : http://tech.flurry.com/regression-testing-api-services-with-restify
	
describe('GeeksRoutes', function() {

	describe('#find()', function() {
		it('should return 400', function() {
			var response = new Response();
			var req = {
				params : {}
			};
			routes.find(req, response);
			assert.equal(response.getStatus(), 400);
		});

		it('should return geeks', function() {
			var response = new Response();
			var req = {
				params : {
					keywords : "java"
				}
			};
			routes.find(req, response);
			assert.equal(response.getStatus(), 200);
			assert.notEqual(response.getData(), undefined);
		});
	});

});