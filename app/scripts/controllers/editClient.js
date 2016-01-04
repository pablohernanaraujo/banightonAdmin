'use strict';

angular.module('banightonAdminApp')
  .controller('EditClientCtrl',['$scope', '$uibModalInstance', 
    'Authentication', 'editClient', '$firebaseObject', 'fire', 'Map', '$timeout', 
    function ($scope, $uibModalInstance, Authentication, editUser, 
      $firebaseObject, fire, Map, $timeout) {  

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

    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.client.address = res.name;
                $scope.client.latitude = res.geometry.location.lat();
                $scope.client.longitude = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    };

    $timeout(function() {
         Map.init();
    }, 1000);


  }]);