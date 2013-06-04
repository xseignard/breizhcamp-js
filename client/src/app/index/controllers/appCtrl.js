angular.module('bzh.geektic.appCtrl', []).
  /**
   * App controller 
   * @class AppCtrl
   * @module bzh.geektic.index
   */
  controller('AppCtrl', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {
    /**
     * Loaded geeks from the server
     * @property $scope.geeks
     * @type {Array}
     */
    // TODO : load it from the server
    $scope.geeks = geeks;
    /**
     * Number of loaded geeks
     * @property $scope.totalGeeks
     * @type {Number}
     */
    $scope.totalGeeks = $scope.geeks.length;
    /**
     * Number of geeks to display, defaults to 12
     * @property $scope.limit
     * @property $scope.defaultLimit
     * @type {Array}
     */
    $scope.limit = $scope.defaultLimit = 12;

    /**
     * Load 6 more geeks
     * @method $scope.more
     */
    $scope.more = function() {
      $scope.limit += 6;
      // tell the rootscope to broadcast that new results are available
      $rootScope.$broadcast('results');
      // scroll down the page
      $scope.scroll();
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
      return 'http://www.gravatar.com/avatar/' + md5(email) + '?s=' + size;
    };

  }]);