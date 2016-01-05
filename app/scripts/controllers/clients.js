'use strict';

angular.module('banightonAdminApp')
  .controller('ClientsCtrl',['$scope', '$rootScope', '$uibModal', 'AuthenticationClients', '$interval',
    function ($scope, $rootScope, $uibModal, AuthenticationClients, $interval) {

    $rootScope.PAGE = 'clients';

    $scope.estatus = 'all';

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

    $scope.register = function(){
      AuthenticationClients.register($scope.client);
    };

    $scope.modal = function(where, client, size){
      if(where === 'newClient'){
        $uibModal.open({
          templateUrl: 'views/newClient.html',
          controller: 'NewClientCtrl'
        });
      }
      if(where === 'editClient'){
        $uibModal.open({
          templateUrl: 'views/editClient.html',
          controller: 'EditClientCtrl',
          resolve: {
            editClient: function () {
              return client;
            }
          }
        });
      }
      if(where === 'editClientDj'){
        $uibModal.open({
          templateUrl: 'views/editClientDj.html',
          controller: 'EditClientDjCtrl',
          resolve: {
            editClient: function () {
              return client;
            }
          }
        });
      }
      if(where === 'activeClient'){
        $uibModal.open({
          templateUrl: 'views/activeClient.html',
          controller: 'ActiveClientCtrl',
          size: size,
          resolve: {
            activeClient: function () {
              return client;
            }
          }
        });
      }
      if(where === 'deleteClient'){
        $uibModal.open({
          templateUrl: 'views/deleteClient.html',
          controller: 'DeleteClientCtrl',
          size: size,
          resolve: {
            deleteClient: function () {
              return client;
            }
          }
        });
      }
    };

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    
  }]);