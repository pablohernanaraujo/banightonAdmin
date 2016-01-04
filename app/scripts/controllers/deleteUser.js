'use strict';

angular.module('banightonAdminApp')
  .controller('DeleteUserCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'deleteUser', '$firebaseObject', 'fire', 
    function ($scope, $uibModalInstance, Authentication, deleteUser, 
      $firebaseObject, fire) {  

    var ref = new Firebase(fire.users+'/users/'+deleteUser);
    var usuario = $firebaseObject(ref);

    usuario.$loaded().then(function(){
      $scope.usuario = usuario;
      $scope.user = $firebaseObject(ref.child('user'));
    });

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
    
  }]);