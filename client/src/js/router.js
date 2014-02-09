// Router
angular.module('app-boilerplate').config(['$routeProvider',
    function($routeProvider) {

    $routeProvider.

        when('/login', {
            templateUrl: 'partials/auth/login.html',
            controller: 'LoginController',
            security: false
        }).

        when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardController',
            security: true
        })

    ;

}]);
