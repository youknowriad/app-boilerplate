angular.module('angular-data').service('AngularDataSerializer', function() {

    return {

        serialize: function(record) {
            var hash = {};
            angular.forEach(record.getAttributes(), function(attribute) {
                hash[attribute] = record[attribute];
            });

            return hash;
        },

        unserialize: function(model, hash) {
            var record = new model();
            this.hydrate(record, hash);

            return record;
        },

        hydrate: function(record, hash) {
            angular.forEach(record.getAttributes(), function(attribute) {
                record[attribute] = hash[attribute];
            });
        }

    };

});
