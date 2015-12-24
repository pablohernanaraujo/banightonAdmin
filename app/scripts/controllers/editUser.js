'use strict';

angular.module('banightonAdminApp')
  .controller('EditUserCtrl',['$scope', '$uibModalInstance', 'Authentication', 'editUser', '$firebaseObject', 'fire', function ($scope, $uibModalInstance, Authentication, editUser, $firebaseObject, fire) {  

    var refUser = new Firebase(fire.users + '/users/' );

    $scope.user = $firebaseObject(refUser);

    console.log(refUser);

    console.log($scope.user);

    console.log('numId: '+ editUser);

    // $scope.user.firstname = $scope.user.user.firstname;
    // $scope.user.lastname = $scope.user.user.lastname;
    // $scope.user.nivel = $scope.user.user.nivel;
    // $scope.user.email = $scope.user.user.email;
    // $scope.user.status = $scope.user.user.status;


    $scope.update = function(user){
      Authentication.update(user);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    
  }]);