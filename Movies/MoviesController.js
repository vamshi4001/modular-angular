'use strict';

Date.prototype.monthName = function() {
    return this.toUTCString().split(' ')[2]
};

angular.module('providerApp')
    .controller('MoviesController', function ($scope, UserService, $location, UtilitiesService, $http) { 
        console.log("MoviesController");
    });


