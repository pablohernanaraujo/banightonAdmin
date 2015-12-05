'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('ClientsCtrl', function ($scope, $http, $location, Password) {
    
    $scope.$watch('client.password', function(pass){
      $scope.passwordStrength = Password.getStrength(pass);
      console.log(Password.getStrength(pass));

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

    $http.get('http://banighton.com.ar/bno_php/clients.php')
      .success(function(data) {
        $scope.clients = data;
    });

    $scope.musics = [];
        
    $scope.add = function () {
      $scope.musics.push({
        inlineChecked: false,
        question: '',
        questionPlaceholder: 'more music',
        text: ''
      });
    };
    $scope.remove = function(index){
      $scope.musics.splice(index, 1);
    };

    $scope.saveClient = function(){
      $http({
        method: 'post',
        url: 'http://banighton.com.ar/bno_php/addClient.php',
        data: $.param({'user' : $scope.tempUser, 'type' : 'save_client' }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
      success(function(data, status, headers, config) {
        if(data.success){
          if( $scope.editMode ){
            $scope.post.users[$scope.index].id = data.id;
            $scope.post.users[$scope.index].name = $scope.tempUser.name;
            $scope.post.users[$scope.index].email = $scope.tempUser.email;
            $scope.post.users[$scope.index].companyName = $scope.tempUser.companyName;
            $scope.post.users[$scope.index].designation = $scope.tempUser.designation;
          }else{
            $scope.post.users.push({
              id : data.id,
              name : $scope.tempUser.name,
              email : $scope.tempUser.email,
              companyName : $scope.tempUser.companyName,
              designation : $scope.tempUser.designation
            });
          }
          $scope.messageSuccess(data.message);
          $scope.userForm.$setPristine();
          $scope.tempUser = {};
          
        }else{
          $scope.messageFailure(data.message);
        }
      }).
      error(function(data, status, headers, config) {
          //$scope.codeStatus = response || "Request failed";
      });
      
      $('.btn-save').button('reset');
    };

    $scope.addClient = function(){
    
      $('.btn-save').button('loading');
      $scope.saveClient();
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
  
