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
    'ImageCropper',
    'firebase'
  ])
  .constant('fire',{
    url:'https://clientsbnoapp.firebaseio.com'
  })
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/clients', {
        templateUrl: 'views/clients.html',
        controller: 'ClientsCtrl',
        controllerAs: 'clients'
      })
      // .when('/clients/:id?', {
      //   templateUrl: 'views/client.html',
      //   controller: 'ClientsCtrl',
      //   controllerAs: 'clients'
      // })
      .when('/clients/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl',
        controllerAs: 'new'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
