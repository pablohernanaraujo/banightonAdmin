'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('ClientsCtrl', function ($scope, $http, $location) {

  	$http.get('../data.json').success(function(data){
  		$scope.clients = data;
  	});

  	$scope.fields = ['name','email'];

  	$scope.sort = function (field){
  		$scope.sort.field = field;
  		$scope.sort.order = !$scope.sort.order;
  	};

  	$scope.sort.field = 'name';
  	$scope.sort.order = false;

  	$scope.show = function (id){
  		$location.url('/clients/'+ id);
  	};
  	

  });
