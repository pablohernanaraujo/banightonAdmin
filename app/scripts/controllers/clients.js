'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('ClientsCtrl', function ($scope, $http, $location, 
    Password, $route) {

    $scope.myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

    var ids = 0;
    //var music = {};
    $scope.clients = {};

    $scope.saveClient = function(client){
      client.id = ids++;
      client.status = 0;
      //console.log(client);
      $scope.myData.push({
        client: client
      });

      $scope.client.email = '';
      $scope.client.password = '';
      $scope.clientConfirmPassword = '';
      $scope.client.name = '';
      $scope.client.address = '';
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
      $scope.clientForm.$setValidity();

    };

    $scope.myData.on('value', function(snapshot){
      $scope.clients = snapshot.val();
      ids = snapshot.numChildren();

      if ($scope.$root && !$scope.$root.$$phase) {
        $scope.$apply();
      }
    });

    $scope.$watch('client.password', function(pass){
      $scope.passwordStrength = Password.getStrength(pass);
      //console.log(Password.getStrength(pass));

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
    // function to evaluate if a number is even
    $scope.isEven = function(value) {

      if (value % 2 === 0){
        return true;   
      }
      else{
        return false;
      } 
    };

    $(':file').filestyle({placeholder: 'No file'});

    $scope.eliminarArchivo = function(obj){
      console.log(obj);
      if(obj === 'logo'){
        $('#logo').filestyle('clear');
      }
      if(obj === 'image'){
        $('#image').filestyle('clear');
      }
      
    };
    
  });