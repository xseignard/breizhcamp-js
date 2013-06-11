'use strict';
var assert = require('assert'),
	GeeksRoutes = require('../../src/routes/geeksRoutes'),
	// mock repo
	geeksRepository = require('../mocks/geeksRepository.mock'),
	// mock http response
	Response = require('../mocks/response.mock'),
	// tested module
	routes = new GeeksRoutes(geeksRepository);

describe('GeeksRoutes', function() {

	describe('#likes()', function() {
		it('should return geeks', function() {
			// TODO write the test !
			throw new Error('Not implemented !');
		});
	});

	describe('#create()', function() {
		it('should create geek', function() {
			var response = new Response();
			var req = {
				body : {
					"NOM" : "test-geek"
				}
			};
			routes.create(req, response);
			assert.equal(response.getStatus(), 201);
			assert.equal(response.getData(), undefined);
		});
	});

});
