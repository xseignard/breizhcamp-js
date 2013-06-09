describe('bzh.geektic.appCtrl', function() {
  
  var ctrl, scope, httpMock, appCtrlMock;
  
  // load module before each test, done through angular-mocks
  beforeEach(module('bzh.geektic.appCtrl'));

  // create the mocked controller before each test
  beforeEach(
    inject(function($controller, $rootScope, $httpBackend) {
      // scope that will be used by the mocked controller
      scope = $rootScope.$new();
      // use $httpBackend to mock $resource calls
      httpMock = $httpBackend;
      httpMock.whenGET('/geek/likes?limit=6&skip=12').respond(more);
      httpMock.whenGET('/geek/likes').respond(response);
      // create the mocked controller
      // since we already loaded the module, we can access to the controller by its name
      ctrl = $controller;
      appCtrlMock = ctrl('AppCtrl', {
        $scope: scope
      });
    })
  );

  // check controller to be registered
  it('controller should be registered', function() {
    expect(appCtrlMock).to.not.equal(null);
  });

  // the scope should be populated by a GET call
  it('should create the scope with some geeks', function() {
    httpMock.expectGET('/geek/likes');
    httpMock.flush();
    expect(scope.geeks.length).to.equal(12);
    expect(scope.geeks[0].email).to.deep.equal(response[0].email);
  });

  // the scope should be populated with 6 more geeks when more is called
  it('should create the scope with some geeks', function() {
    httpMock.expectGET('/geek/likes');
    httpMock.flush();
    scope.more();
    httpMock.expectGET('/geek/likes?limit=6&skip=12');
    httpMock.flush();
    expect(scope.geeks.length).to.equal(18);
    expect(scope.geeks[17].email).to.deep.equal(more[5].email);
  });

  // gravatar function
  it('should return the right url from gravatar function', function() {
    httpMock.flush();
    var url = 'http://www.gravatar.com/avatar/34a47bd77922181070aef96782110714?s=140';
    expect(scope.gravatar(scope.geeks[0].email, 140)).to.equal(url);
  });

});