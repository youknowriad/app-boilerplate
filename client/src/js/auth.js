// Router
angular.module('app-boilerplate').config(['AuthProvider', function (AuthProvider) {

    AuthProvider.setConfig({
        host: 'api/',
        loginUrl: 'auth/login',
        logoutUrl: 'auth/logout',
        loggedinUrl: 'auth/loggedin',
        target: '/dashboard'
    });

}]);

// Handling Authorisations
angular.module('app-boilerplate').run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        if (!Auth.authorize(next.security)) {
            if (Auth.isLoggedIn()) {
                // unauthorized
                $location.path('/login');
            } else {
                $location.path('/login');
            }
        }
    });
}]);
