(function() {

    'use strict';

    function config ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!');
        // routes
        $routeProvider
            .when('/', {
                templateUrl: './partials/partial1.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    angular
        .module('app', ['ngRoute', 'ngAnimate'])
        .config(config);
}());


