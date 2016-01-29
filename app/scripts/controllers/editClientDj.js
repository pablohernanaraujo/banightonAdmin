'use strict';

angular.module('banightonAdminApp')
  .controller('EditClientDjCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'editClient', '$firebaseObject', 'fire', 
    function ($scope, $uibModalInstance, Authentication, editUser, 
      $firebaseObject, fire) {  

    var ref = new Firebase(fire.clients+'/clients/'+editUser);
    var cliente = $firebaseObject(ref);

    cliente.$loaded().then(function(){
      $scope.cliente = cliente;
      $scope.client = $firebaseObject(ref.child('client'));

    });



    function archivos(){
      $(':file').filestyle({placeholder: 'No file'});
    }
    setTimeout(archivos, 100);

    $scope.myNumber = 1;
    
    $scope.addMusic = function(){
      $scope.myNumber = $scope.myNumber + 1;
      $scope.isEven($scope.myNumber);
      
    };
    
    $scope.isEven = function(value) {

      if (value % 2 === 0){
        return true;   
      }
      else{
        return false;
      } 
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };


  }]);