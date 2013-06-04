angular.module('bzh.geektic', ['bzh.geektic.appCtrl', 'bzh.geektic.listCtrl', 'bzh.geektic.details', 'bzh.geektic.animations'])
  // route configuration
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      // load the List controller when on the / page
      // and render the list.tpl.html template
      .when('/', {
        controller: 'ListCtrl',
        templateUrl: 'app/index/partials/list.tpl.html'
      })
      // redirect to / for any other route
      .otherwise({
        redirectTo : '/'
      });
  }]);
  
