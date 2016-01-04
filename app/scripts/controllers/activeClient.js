'use strict';

angular.module('banightonAdminApp')
  .controller('ActiveClientCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'activeClient', '$firebaseObject', 'fire', 
    function ($scope, $uibModalInstance, Authentication, activeClient, 
      $firebaseObject, fire) {  

    var ref = new Firebase(fire.clients+'/clients/'+activeClient);
    var cliente = $firebaseObject(ref);

    cliente.$loaded().then(function(){
      $scope.cliente = cliente;
      $scope.client = $firebaseObject(ref.child('client'));
    });

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    
  }]);