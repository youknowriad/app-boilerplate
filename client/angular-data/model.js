angular.module('angular-data').factory('AngularDataModelFactory', function() {

    return {

        get: function(configuration) {

            return function() {

                return {
                    getType: function() {
                        return configuration.name;
                    },

                    getPrimaryKey: function() {
                        return this[configuration.primaryKey];
                    },

                    getAttributes: function() {
                        return configuration.attributes;
                    }
                };

            };

        }

    };

});
