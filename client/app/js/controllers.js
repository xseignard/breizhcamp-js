'use strict';

/* Controllers */

function GeeksListCtrl($scope) {
  $scope.geeks = [
  	{
  		"firstname": "Prunier", 
  		"lastname": "Sébastien", 
  		"email": "seb@domain.com", 
  		"city": "Nantes", 
  		"likes" : ["java","javascript","breizhcamp"], 
  		"hates": ["fish"]
  	},
  	{
  		"firstname": "Seignard", 
  		"lastname": "Xavier", 
  		"email": "xav@domain.com", 
  		"city": "Nantes", 
  		"likes" : ["javascript","arduino","node.js"], 
  		"hates": ["scala", "idea"]
  	},
  	{
  		"firstname": "Doe", 
  		"lastname": "John", 
  		"email": "johndoe@domain.com", 
  		"city": "Zzzzz", 
  		"likes" : ["tests"], 
  		"hates": ["nothing"]
  	}
  ];

  $scope.orderProp = 'firstname';
}