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

    $scope.submittedFile = {};
	$scope.obj = {};
	$scope.submit = function(obj){
	 console.log(JSON.stringify(obj));

	};
	$scope.myData = new Firebase('https://clientsbnoapp.firebaseio.com/image');

    $scope.submit = function(obj){
      
      $scope.myData.push({
      	clientLogo:$scope.obj.logo,
      	clientImage:$scope.obj.image
      });
      //console.log(JSON.stringify(obj.testFile));
    };

    $scope.myData.on('value', function(snapshot){
	    $scope.imagenes = snapshot.val();
	    //console.log($scope.imagenes);
	    if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
	    	$scope.$apply();
	    }
    });

   
  });