'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('MainCtrl', function ($scope) {

    
  	$scope.employeeName = '';
  	$scope.employeeAge = 0;
  	$scope.employees = {};

  	$scope.myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

  	$scope.saveEmployee = function(){
  		$scope.myData.push({employeeName:$scope.employeeName,
  							employeeAge:$scope.employeeAge});
  		$scope.employeeName = '';
  		$scope.employeeAge = 0;
  	};

  	$scope.myData.on('value', function(snapshot){
  		$scope.employees = snapshot.val();
  		// if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
		  //   $scope.$apply();
		  // }
  	});
  });