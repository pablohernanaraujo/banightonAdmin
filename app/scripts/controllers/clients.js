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
    Password, clientsService, $route) {

    $scope.myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

    $scope.clientId = '';
    $scope.clientEmail = '';
    $scope.clientPassword = '';
    $scope.clientName = '';
    $scope.clientAddress = '';
    $scope.clientHomePhone = '';
    $scope.clientCellPhone = '';
    $scope.clientMusic = '';
    $scope.clientAniversary = '';

    $scope.clientBirthday = '';

    $scope.clientWebsite = '';
    $scope.clientLogo = '';
    $scope.clientLogoText = '';
    $scope.clientImage = '';
    $scope.clientImageText = '';

    $scope.clients = {};

    $scope.myData = new Firebase('https://clientsbnoapp.firebaseio.com/clients');

    $scope.saveClient = function(){
      
      $scope.myData.push({
        clientId:$scope.clientId + 1,
        clientEmail:$scope.clientEmail,
        clientPassword:$scope.clientPassword,
        clientName:$scope.clientName,
        clientAddress:$scope.clientAddress,
        clientHomePhone:$scope.clientHomePhone,
        clientCellPhone:$scope.clientCellPhone,
        clientMusic:$scope.clientMusic,
        clientAniversary:$scope.clientAniversary,
        clientBirthday:$scope.clientBirthday,
        clientWebsite:$scope.clientWebsite,
        clientLogo:$scope.clientLogo,
        clientLogoText:$scope.clientLogoText,
        clientImage:$scope.clientImage,
        clientImageText:$scope.clientImageText,
        clientStatus:0
      });

      $scope.clientEmail = '';
      $scope.clientPassword = '';
      $scope.clientConfirmPassword = '';
      $scope.clientName = '';
      $scope.clientAddress = '';
      $scope.clientHomePhone = '';
      $scope.clientCellPhone = '';
      $scope.clientMusic = '';
      $scope.clientAniversary = '';

      $scope.clientBirthday = '';

      $scope.clientWebsite = '';
      $scope.clientLogo = '';
      $scope.clientLogoText = '';
      $scope.clientImage = '';
      $scope.clientImageText = '';

      $scope.clientForm.$setPristine();
      $scope.clientForm.$setUntouched();
      $scope.clientForm.$setValidity();

      //$route.reload();

    };

    $scope.myData.on('value', function(snapshot){
      $scope.clients = snapshot.val();
      $scope.clientId = snapshot.numChildren();

      if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
        $scope.$apply();
      }
      
    });

 

    $scope.$watch('clientPassword', function(pass){
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

    // $http.get('http://banighton.com.ar/bno_php/clients.php')
    //   .success(function(data) {
    //     $scope.clients = data;
    // });

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
    
    $scope.fileChanged = function(e) {    
      
      console.log(e);

      $('#myModal').modal('toggle');

      var files = e.target.files;
    
      var fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);   
      
      fileReader.onload = function(e) {
        $scope.imgSrc = this.result;
        $scope.$apply();
      };
      
    };   
     
    $scope.clear = function() {
       $scope.imageCropStep = 1;
       delete $scope.imgSrc;
       delete $scope.result;
       delete $scope.resultBlob;
    };

  });