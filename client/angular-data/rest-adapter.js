angular.module('angular-data').provider('AngularDataRestAdapter', {

    baseUrl: null,

    setBaseUrl: function(url) {
        this.baseUrl = url;
    },

    $get: ['$http', 'AngularDataSerializer', function($http, AngularDataSerializer) {

        var baseUrl = this.baseUrl;

        var getUrlForType = function(type) {
            return baseUrl + '/' + type;
        };


        return {

            findAll: function(type) {
                return $http.get(getUrlForType(type));
            },

            find: function(type, primaryKey) {
                return $http.get(getUrlForType(type) + '/' + primaryKey);
            },

            findQuery: function(type, filters) {
                return $http({
                    method: 'GET',
                    url: getUrlForType(type),
                    params: filters
                });
            },

            remove: function(record) {
                return $http.delete(getUrlForType(record.getType()) + '/' + record.getPrimaryKey());
            },

            update: function(record) {
                return $http.put(getUrlForType(record.getType()) + '/' + record.getPrimaryKey(), AngularDataSerializer.serialize(record));
            },

            create: function(record) {
                return $http.post(getUrlForType(record.getType()) + '/' + record.getPrimaryKey(), AngularDataSerializer.serialize(record));
            }

        };

    }]

});
