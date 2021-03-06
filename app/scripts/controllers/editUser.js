'use strict';

angular.module('banightonAdminApp')
  .controller('EditUserCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'editUser', '$firebaseObject', 'fire', 
    function ($scope, $uibModalInstance, Authentication, editUser, 
      $firebaseObject, fire) {  

    var ref = new Firebase(fire.users+'/users/'+editUser);
    var usuario = $firebaseObject(ref);

    usuario.$loaded().then(function(){
      $scope.usuario = usuario;
      $scope.user = $firebaseObject(ref.child('user'));
    });


    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    
  }]);