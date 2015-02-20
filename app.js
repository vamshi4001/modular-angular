'use strict';

/**
 * @ngdoc overview
 * @name providerApp
 * @description
 * # providerApp
 *
 * Main module of the application.
 */
angular
  .module('providerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];  
    delete $httpProvider.defaults.headers.post['Content-Type'];
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'Signin/SignIn.html',
        controller: 'SignInController'
      })
      .when('/movies', {
        templateUrl: 'Movies/Movies.html',
        controller: 'MoviesController'
      })
      .otherwise({
        redirectTo: '/movies'
      });
  })