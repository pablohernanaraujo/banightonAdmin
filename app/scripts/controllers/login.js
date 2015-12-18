'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('LoginCtrl',['$scope', 'Authentication', function ($scope, Authentication) {
  	
  	$scope.userLogin = function(){
  		Authentication.login($scope.user);
  	};

  	$scope.userLogout = function(){
  		Authentication.logout();
  	};

  	$scope.register = function(){
  		Authentication.register($scope.user);
  	};

  }]);