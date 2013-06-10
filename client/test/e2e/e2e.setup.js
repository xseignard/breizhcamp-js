angular.module('bzh.geektic.appCtrl').
  
  config(function($provide){
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  }).
  run(function($httpBackend) {
    $httpBackend.whenGET('/geek/likes?limit=6&skip=12').respond(more);
    $httpBackend.whenGET('/geek/likes').respond(response);
    $httpBackend.whenGET('app/index/partials/list.tpl.html').passThrough();
  });