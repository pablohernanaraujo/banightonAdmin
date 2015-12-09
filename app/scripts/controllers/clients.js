'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('ClientsCtrl', function ($rootScope, $scope, $http, $location, 
    Password, $route) {

    $scope.myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

    var ids = 0;
    
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
      $scope.client.confirmPassword = '';
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

      $scope.clientForm.$setPristine();
      $scope.clientForm.$setUntouched();
      $scope.clientForm.$setValidity();

    };

    $scope.myData.on('value', function(snapshot){
      $scope.clients = snapshot.val();
      ids = snapshot.numChildren();

      if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
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

    $scope.musics = [];
        
    $scope.addMusic = function () {
      $scope.musics.push({
        inlineChecked: false,
        question: '',
        questionPlaceholder: 'more music',
        text: ''
      });
    };
    $scope.removeMusic = function(index){
      $scope.musics.splice(index, 1);
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