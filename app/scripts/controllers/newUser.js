'use strict';

angular.module('banightonAdminApp')
  .controller('NewUserCtrl',['$scope', '$uibModalInstance', 'Authentication', function ($scope, $uibModalInstance, Authentication) {

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
      $scope.user.nivel = '';
      $scope.user.email = '';
      $scope.user.password = '';
    };

  }]);