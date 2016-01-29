'use strict';

angular.module('banightonAdminApp')
  .controller('DeleteCtrl',['$scope', '$rootScope', '$uibModal', 'Authentication', 'AuthenticationClients', '$interval', 
    function ($scope, $rootScope, $uibModal, Authentication, AuthenticationClients, $interval) {

    $rootScope.PAGE = 'delete';
  	
    Authentication.onlineActive();

    AuthenticationClients.online();

    var tiempo = 1;
    var  ver = $interval(function(){
      $scope.tiempo = tiempo++;
      if($scope.dataLoading === false){
        $scope.killtimer();
      }
    },1000);

    $scope.killtimer=function(){  
      $interval.cancel(ver);    
    };

    $scope.modal = function(where, user, size){
   
      if(where === 'deleteUser'){
        console.log(user);
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
      if(where === 'deleteClient'){
        console.log(user);
        $uibModal.open({
          templateUrl: 'views/deleteClient.html',
          controller: 'DeleteClientCtrl',
          size: size,
          resolve: {
            deleteClient: function () {
              return user;
            }
          }
        });
      }
    };

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    
  }]);