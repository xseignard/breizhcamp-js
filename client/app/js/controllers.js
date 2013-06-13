'use strict';

/* Controllers */

function GeeksListCtrl($scope, $http) {
  $http.get('geek/likes').success(function(data){
    $scope.geeks = data;
  });

  $scope.update = function() {
      $http.get('geek/likes/' + $scope.query).success(function(data){
    	$scope.geeks = data;
	});
  };

  $scope.orderProp = 'firstname';
}