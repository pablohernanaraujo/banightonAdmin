'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MewCtrl
 * @description
 * # MewCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('NewCtrl', function ($scope, $location, ClientsData) {
    
  	$scope.client = new ClientsData({
      client:    ['','text'],
      email:     ['','email'],
      password:  ['','password'],
      name:      ['','text'],
      address:   ['','text'],
      homePhone: ['','tel'],
      cellPhone: ['','tel'],
      music:     ['','text'],
      aniversary:['','date'],
      website:   ['','url']
    });

    $scope.save = function(){
      if($scope.newClient.$invalid){
        $scope.$broadcast('record:invalid');
      } else {
        $scope.client.$save();
        $location.url('/clients');
      }
    };

  });