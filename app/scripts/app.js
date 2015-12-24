'use strict';

/**
 * @ngdoc overview
 * @name banightonAdminApp
 * @description
 * # banightonAdminApp
 *
 * Main module of the application.
 */
angular
  .module('banightonAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-toArrayFilter',
    'ngMessages',
    'toggle-switch',
    'validation.match',
    'firebase',
    'ng-file-model',
    'ui.bootstrap'
  ])
  .constant('fire',{
      'users' :'https://usersbnoapp.firebaseio.com',
      'clients' : 'https://clientsbnoapp.firebaseio.com'
    })
  .run(['$rootScope', '$location',
    function($rootScope, $location){
      $rootScope.$on('$routeChangeError', 
        function(event, next, previous, error){
          if(error === 'AUTH_REQUIRED'){
            $rootScope.message = 'Sorry, you must log in to access thar page';
            $location.path('/');
          }
        });
    }])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/clients', {
        templateUrl: 'views/clients.html',
        controller: 'ClientsCtrl',
        controllerAs: 'clients',
        resolve: {
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      })
      .when('/users/:uId', {
        templateUrl: 'views/user.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve: {
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
