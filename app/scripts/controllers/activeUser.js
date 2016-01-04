'use strict';

angular.module('banightonAdminApp')
  .controller('ActiveUserCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'activeUser', '$firebaseObject', 'fire', 
    function ($scope, $uibModalInstance, Authentication, activeUser, 
      $firebaseObject, fire) {  

    var ref = new Firebase(fire.users+'/users/'+activeUser);
    var usuario = $firebaseObject(ref);

    usuario.$loaded().then(function(){
      $scope.usuario = usuario;
      $scope.user = $firebaseObject(ref.child('user'));
    });

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    
  }]);