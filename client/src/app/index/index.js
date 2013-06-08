angular.module('bzh.geektic', ['bzh.geektic.appCtrl', 'bzh.geektic.details', 'bzh.geektic.animations'])
  /**
   * Route configuration
   * @class Index
   * @module bzh.geektic
   */
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      // render the list.tpl.html template when on the / page
      .when('/', {
        templateUrl: 'app/index/partials/list.tpl.html'
      })
      // redirect to / for any other route
      .otherwise({
        redirectTo : '/'
      });
  }]);
