describe('bzh.geektic.appCtrl', function() {
  
  // test data
  var linus = { 
    firstname: 'Torvald',
    lastname: 'Linus',
    email: 'torvalds@osdl.org',
    city: 'Helsinki',
    likes: [ 'linux', 'git', 'plongee' ],
    hates: [ 'fsf', 'rms' ]
  };

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
      httpMock.when('GET', '/geek/likes').respond([linus]);
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
    expect(scope.geeks.length).to.equal(1);
    expect(scope.geeks[0].email).to.deep.equal(linus.email);
  });


});