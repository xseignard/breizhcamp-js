angular.module('bzh.geektic.appCtrl', ['ngResource']).
  /**
   * App controller
   * @class AppCtrl
   * @module bzh.geektic.index
   */
  controller('AppCtrl', ['$scope', '$rootScope', '$resource', function($scope, $rootScope, $resource) {

    /**
     * Resource that handle the REST call to the server to fetch geeks
     */
    var Geek = $resource('/geek/likes/:like');

    /**
     * Loaded geeks from the server
     * @property $scope.geeks
     * @type {Array}
     */
    $scope.geeks = Geek.query();

    /**
     * Load 6 more geeks
     * @method $scope.more
     */
    $scope.more = function() {
      var opts = {limit : 6, skip : $scope.geeks.length};
      if ($scope.q && $scope.q.length > 0) {
        opts.like = $scope.q;
      }
      Geek.query(opts, function(newGeeks) {
        // push each new Geek to the scope
        angular.forEach(newGeeks, function(newGeek, key){
          if (newGeek instanceof Geek) $scope.geeks.push(newGeek);
        });
        // tell the rootscope to broadcast that new results are available
        $rootScope.$broadcast('results');
        // scroll down the page
        $scope.scroll();
      });
    };

    /**
     * Scroll down the page
     */
    $scope.scroll = function() {
        TweenMax.to(window, 0.5, {delay:0.9, scrollTo:"max", ease:Power2.easeOut});
    };

    /**
     * Fetch the corresponding gravatar image from the given email
     * @method $scope.gravatar
     * @param {String} email
     * @param {Number} size - the size of the image to return
     */
    $scope.gravatar = function(email, size) {
      return 'http://www.gravatar.com/avatar/' + md5(email) + '?d=mm&s=' + size;
    };

  }]);