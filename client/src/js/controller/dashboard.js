angular.module('app-boilerplate').controller('DashboardController', ['$scope', '$location', 'Auth',
    function ($scope, $location, Auth) {

        // Login
        $scope.logout = function() {
            Auth.logout().then(function() {
                $location.path('/login');
            });
        };
    }
]);
