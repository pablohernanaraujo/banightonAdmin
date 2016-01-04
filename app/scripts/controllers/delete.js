'use strict';

angular.module('banightonAdminApp')
  .controller('DeleteCtrl',['$scope', '$rootScope', '$uibModal', 'Authentication', 
    function ($scope, $rootScope, $uibModal, Authentication) {

    $rootScope.PAGE = 'delete';
  	
    Authentication.onlineActive();

    $scope.modal = function(where, user, size){
   
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