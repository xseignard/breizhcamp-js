angular.module('bzh.geektic.listCtrl', []).
  /**
   * List controller 
   * @class ListCtrl
   * @module Geektic
   */
  controller('ListCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    /**
     * Fetch the first geeks from zero to the given limit
     * @method $scope.fetchGeeks
     * @param {Number} limit - the number of geeks to return
     */
    $scope.fetchGeeks = function(limit) {
      return $scope.geeks.slice(0,limit);
    };

  }]);