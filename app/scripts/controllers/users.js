'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('UsersCtrl', ['$scope', '$timeout', '$firebaseArray',
        function($scope, $timeout, $firebaseArray) {

    var ref = new Firebase('https://usersbnoapp.firebaseio.com/users');

    ref.on('value',function(snapshot){
    	$timeout(function() {
	    	var users = snapshot.val();
    		$scope.users = users;
	    }, 0);
    });

  }]);
