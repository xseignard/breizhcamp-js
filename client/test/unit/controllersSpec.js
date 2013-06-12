'use strict';

/* jasmine specs for controllers go here */

describe('breizhcamp-js backend controllers', function() {

  describe('GeeksListCtrl', function(){
    var scope, ctrl;

    beforeEach(function() {
      scope = {},
      ctrl = new GeeksListCtrl(scope);
    });


    it('should create "geeks" model with 3 geeks', function() {
      expect(scope.geeks.length).toBe(3);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('firstname');
    });
  });
});