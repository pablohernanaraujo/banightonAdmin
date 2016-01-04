'use strict';


angular.module('banightonAdminApp')
  .controller('NewClientCtrl',['$scope', '$uibModalInstance', 'AuthenticationClients', 'Password', 'Map', '$timeout', 
    function ($scope, $uibModalInstance, AuthenticationClients, Password, Map, $timeout) {
   
    $scope.client = {'client' : 'Boliche'};

    $scope.$watch('client.client', function(data){

      if(data === 'Boliche'){
        $scope.mostrar = true;
      }
      if(data === 'Dj'){
        $scope.mostrar = false;
      }
       
    });
    

    function archivos(){
      $(':file').filestyle({placeholder: 'No file'});
    }
    setTimeout(archivos, 100);
    

    $scope.$watch('client.password', function(pass){
      $scope.passwordStrength = Password.getStrength(pass);

      if($scope.isPasswordWeak()){
        $scope.clientForm.password.$setValidity('strength', false);
      }else{
        $scope.clientForm.password.$setValidity('strength', true);
      }
      
    });

    $scope.isPasswordWeak = function() {

      return $scope.passwordStrength < 40;
    };

    $scope.isPasswordOk = function() {

      return $scope.passwordStrength >= 40 && $scope.passwordStrength <= 70;
    };

    $scope.isPasswordStrong = function() {

      return $scope.passwordStrength > 70;
    };

    

    $scope.isInputValid = function(input) {

      return input.$dirty && input.$valid;
    };

    $scope.isInputInvalid = function(input) {
      return input.$dirty && input.$invalid;
    };

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

    $scope.eliminarArchivo = function(obj){
      console.log(obj);
      if(obj === 'logo'){
        $('#logo').filestyle('clear');
      }
      if(obj === 'image'){
        $('#image').filestyle('clear');
      }
      
    };

    $scope.register = function(){
       
      AuthenticationClients.register($scope.client);
      
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };

    $scope.clean = function(){
      
      $scope.client.email = '';
      $scope.client.password = '';
      $scope.clientConfirmPassword = '';
      $scope.client.bolicheName = '';
      $scope.client.lastname = '';
      $scope.client.firstname = '';
      $scope.searchPace = '';
      $scope.client.address = '';
      $scope.client.latitude = '';
      $scope.client.longitude = '';
      $scope.client.homePhone = '';
      $scope.client.cellPhone = '';
      $scope.client.music = '';
      $scope.client.aniversary = '';
      $scope.client.birthday = '';
      $scope.client.website = '';
      $scope.client.logo = '';
      $scope.client.logoText = '';
      $scope.client.image = '';
      $scope.client.imageText = '';

      $scope.eliminarArchivo('logo');
      $scope.eliminarArchivo('image');

      $scope.musics = [];

      $scope.clientForm.$setPristine();
      $scope.clientForm.$setUntouched();
      //$scope.clientForm.$setValidity();
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

    // pick date -------------------------------------------------

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.status = {
      opened: false
    };

  }]);