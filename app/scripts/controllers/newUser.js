'use strict';

angular.module('banightonAdminApp')
  .controller('NewUserCtrl',['$scope', '$uibModalInstance', 'Authentication', function ($scope, $uibModalInstance, Authentication) {

    $scope.user = {'nivel' : '1'};

  	$scope.register = function(){
  		Authentication.register($scope.user);
  	};

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };



    $scope.clean = function(){
      $scope.userForm.$setPristine();
      $scope.userForm.$setUntouched();

      $scope.user.firstname = '';
      $scope.user.lastname = '';
      $scope.user.nivel = '1';
      $scope.user.email = '';
      $scope.user.password = '';
    };

  }]);