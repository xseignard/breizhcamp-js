'use strict';

/* jasmine specs for controllers go here */

describe('breizhcamp-js backend controllers', function() {

  describe('GeeksListCtrl', function(){
    var scope, ctrl, httpMock;

    var geeks = [
        {firstname:'Xavier', name:'Seignard', city:'Nantes', likes:['Breizhcamp'], hate:['Scala']},
        {firstname:'Sebastien', name:'Prunier', city:'Nantes', likes:['Breizhcamp'], hate:['Cheap wine']},
        {firstname:'Super', name:'Coder', city:'Rennes', likes:['Rain'], hate:['Breizhcamp']}
      ];


    beforeEach(
      inject(function($rootScope, $httpBackend, $controller) {
        scope = $rootScope.$new(),
        httpMock = $httpBackend;
        httpMock.whenGET('geek/likes').respond(geeks);
        ctrl = $controller('GeeksListCtrl',{$scope:scope});
      })
    );


    it('should create "geeks" model with 3 geeks', function() {
      httpMock.flush();
      expect(scope.geeks.length).toBe(3);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('firstname');
    });
  });
});