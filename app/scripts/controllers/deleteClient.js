'use strict';

angular.module('banightonAdminApp')
  .controller('DeleteClientCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'deleteClient', '$firebaseObject', 'fire', 
    function ($scope, $uibModalInstance, Authentication, deleteClient, 
      $firebaseObject, fire) {  

    var ref = new Firebase(fire.clients+'/clients/'+ deleteClient);
    var usuario = $firebaseObject(ref);

    usuario.$loaded().then(function(){
      $scope.usuario = usuario;
      $scope.client = $firebaseObject(ref.child('client'));
    });

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
    
  }]);