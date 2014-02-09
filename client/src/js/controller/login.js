angular.module('app-boilerplate').controller('LoginController', ['$scope', '$location', 'Auth',
    function ($scope, $location, Auth) {

        $scope.error    = false;
        $scope.loading  = true;

        // Check Login
        Auth.check().then(function() {
            $location.path(Auth.target);
        }, function() {
            $scope.loading = false;
        });

        // Login
        $scope.submit = function() {
            Auth.login($scope.username, $scope.password).then(function() {
                $location.path(Auth.target);
            }, function() {
                $scope.error = true;
            });
        };
    }
]);
