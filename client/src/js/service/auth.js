angular.module('app-boilerplate').provider('Auth', function () {

    var config = {
        host: '',
        loginUrl: '',
        logoutUrl: '',
        loggedinUrl: '',
        target: ''
    };

    this.setConfig = function (configuration) {
        config = configuration;
    };

    this.$get = ['$http', '$q', function ($http, $q) {

        var user,
            lastUser;

        return {

            target: config.target,

            getUser: function () {
                return user;
            },

            getLastUser: function () {
                return lastUser;
            },

            isLoggedIn: function () {
                return user !== null;
            },

            authorize: function (role) {
                return !role || (
                    user !== null &&
                    (role === true || _.contains(user.roles, role))
                );
            },

            login: function (username, password) {
                var defer = $q.defer();
                $http({
                    url: config.host + config.loginUrl,
                    method: 'POST',
                    data: {
                        username: username,
                        password: password
                    }
                }).success(function (data) {
                    user = data;
                    lastUser = data;
                    defer.resolve(user);
                }).error(function () {
                    defer.reject();
                });

                return defer.promise;
            },

            logout: function () {
                var defer = $q.defer();
                $http.get(config.host + config.logoutUrl).success(function () {
                    user = null;
                    defer.resolve();
                }).error(function () {
                    defer.reject();
                });

                return defer.promise;
            },

            check: function () {
                var defer = $q.defer();
                $http({
                    url: config.host + config.loggedinUrl,
                    method: 'GET'
                }).success(function (data) {
                    user = data;
                    lastUser = data;
                    defer.resolve(user);
                }).error(function () {
                    user = null;
                    defer.reject();
                });

                return defer.promise;
            }
        };
    }];
});
