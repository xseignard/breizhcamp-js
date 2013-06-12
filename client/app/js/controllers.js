'use strict';

/* Controllers */

function GeeksListCtrl($scope, $http) {
  $http.get('geek/likes').success(function(data){
    $scope.geeks = data;
  });

  $scope.update = function() {
    // TODO write the code to get geeks corresponding to the search query
  }

  $scope.orderProp = 'firstname';
}