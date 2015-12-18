'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('UsersCtrl', ['$scope', '$firebaseArray', 'fire',
        function($scope, $firebaseArray, fire) {

  	var ref = new Firebase(fire.users + '/users');

    $scope.users = $firebaseArray(ref);

    console.log($scope.users);
    
  }]);
