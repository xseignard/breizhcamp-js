describe('bzh.geektic', function() {
  
  // load assertion lib
  var expect = chai.expect;
  var app, deps;
  // load module before each test, done through angular-mocks
  // and save the app deps
  beforeEach(function() {
      app = module('bzh.geektic');
      deps = angular.module('bzh.geektic').requires;
    }
  );

  // root route should use the list template
  // it('root route should use the list template', function() {
  //   inject(function($route, $location, $rootScope) {
  //     expect($route.current).to.be.undefined;
  //     $location.path('/');
  //     $rootScope.$digest();
  //     expect($route.current.templateUrl).to.be('app/index/partials/list.tpl.html');
  //   });
  // });

  // check module to be registered
  it('should be registered', function() {
    expect(module).not.to.equal(null);
  });

  // check loaded modules
  it('should have appCtrl, details and animations deps', function() {
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };

    expect(hasModule('bzh.geektic.appCtrl')).to.equal(true);
    expect(hasModule('bzh.geektic.details')).to.equal(true);
    expect(hasModule('bzh.geektic.animations')).to.equal(true);
  });
});