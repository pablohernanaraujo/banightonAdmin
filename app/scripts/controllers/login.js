'use strict';

/**
 * @ngdoc function
 * @name banightonAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banightonAdminApp
 */
angular.module('banightonAdminApp')
  .controller('LoginCtrl',['$scope', '$rootScope', '$uibModal', 'Authentication', 
    function ($scope, $rootScope, $uibModal, Authentication) {

    $rootScope.PAGE = 'users';
  	
    Authentication.online();

  	$scope.userLogin = function(){
  		Authentication.login($scope.user);
  	};

  	$scope.userLogout = function(){
  		Authentication.logout();
  	};

  	$scope.register = function(){
  		Authentication.register($scope.user);
  	};

    $scope.clean = function(){
      $scope.myform.$setPristine();
      $scope.myform.$setUntouched();
      $scope.myform.$setValidity();
    };

    $scope.modal = function(where, user, size){
      if(where === 'newUser'){
        $uibModal.open({
          templateUrl: 'views/newUser.html',
          controller: 'NewUserCtrl'
        });
      }
      if(where === 'editUser'){
        $uibModal.open({
          templateUrl: 'views/editUser.html',
          controller: 'EditUserCtrl',
          resolve: {
            editUser: function () {
              return user;
            }
          }
        });
      }
      if(where === 'activeUser'){
        $uibModal.open({
          templateUrl: 'views/activeUser.html',
          controller: 'ActiveUserCtrl',
          size: size,
          resolve: {
            activeUser: function () {
              return user;
            }
          }
        });
      }
      if(where === 'deleteUser'){
        $uibModal.open({
          templateUrl: 'views/deleteUser.html',
          controller: 'DeleteUserCtrl',
          size: size,
          resolve: {
            deleteUser: function () {
              return user;
            }
          }
        });
      }
    };

    $scope.pageSize = 5;
    $scope.currentPage = 1;
    
  }]);
