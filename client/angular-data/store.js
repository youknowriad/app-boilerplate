angular.module('angular-data').provider('AngularDataStore', {

    $get: ['$q', 'AngularDataModelFactory', 'AngularDataSerializer', 'AngularDataRestAdapter',
        function($q, AngularDataModelFactory, AngularDataSerializer, AngularDataRestAdapter) {

        /**
         * Array of loaded records by type
         * @type {{}}
         */
        var records = {};

        /**
         * Array of model configs
         * @type {{}}
         */
        var models = {};

        return {

            /**
             * Add A new model
             * A model is a function with a config object attached in prototype (static)
             *
             * @param configuration
             */
            addModel: function(configuration) {
                var type  = configuration.name;
                models[type] = AngularDataModelFactory.get(configuration);
                records[type]  = [];
            },

            /**
             * Create a new instance of a model with hash content
             *
             * @return {}
             */
            create: function(type, hash) {
                return AngularDataSerializer.unserialize(models[type], hash);
            },

            /**
             * Loads a record in the store
             * Not a public api
             *
             * @param record
             */
            load: function(record) {
                records[record.getType()].push(record);
            },

            /**
             * Persist the model instance
             *
             * @param record
             */
            save: function(record) {
                var self = this;
                if (record.isNew()) {
                    AngularDataRestAdapter.create(record).success(function(data) {
                        AngularDataSerializer.hydrate(record, data);
                        self.load(record);
                    });
                } else {
                    AngularDataRestAdapter.update(record).success(function(data) {
                        AngularDataSerializer.hydrate(record, data);
                    });
                }
            },

            /**
             * Remove a model instance
             *
             * @param record
             */
            remove: function(record) {
                var primaryKey = record.getPrimaryKey();
                AngularDataRestAdapter.remove(record).success(function() {
                    angular.forEach(records[type], function(value, key) {
                        if (value.getPrimaryKey() === primaryKey) {
                            records[type].splice(key, 1);
                        }
                    });
                });

            },

            /**
             * Find a model by id
             *
             * @param type
             * @param primaryKey
             * @returns {boolean}
             */
            find: function(type, primaryKey) {
                var deferred = $q.defer();
                var self = this;

                var found = false;
                angular.forEach(records[type], function(record) {
                    if (record.getPrimaryKey() === primaryKey) {
                        found = value;
                        deferred.resolve(record);
                    }
                });

                if (!found) {
                    AngularDataRestAdapter.find(type, primaryKey).success(function(hash) {
                        var record = AngularDataSerializer.unserialize(models[type], hash);
                        self.load(record);
                        deferred.resolve(record);
                    }).error(function() {
                        deferred.reject();
                    });
                }

                return deferred.promise;
            },

            /**
             * Find all model instances
             *
             * @param type
             * @returns {*}
             */
            findAll: function(type) {
                var deferred = $q.defer();
                var self = this;
                AngularDataRestAdapter.findAll(type).success(function(hashes) {
                    angular.forEach(hashes, function(hash) {
                        var record = AngularDataSerializer.unserialize(models[type], hash);
                        self.load(record);
                    });
                    deferred.resolve(records[type]);
                }).error(function() {
                    deferred.reject();
                });

                return deferred.promise;
            },

            /**
             * Find all model instances based on filters
             *
             * @param type
             * @param filters
             * @returns {Array}
             */
            findBy : function(type, filters) {
                var deferred = $q.defer();
                var self = this;
                AngularDataRestAdapter.findBy(type, filters).success(function(hashes) {
                    angular.forEach(hashes, function(hash) {
                        var record = AngularDataSerializer.unserialize(models[type], hash);
                        self.load(record);
                    });
                    deferred.resolve(records[type]);
                }).error(function() {
                    deferred.reject();
                });

                return deferred.promise;
            },

            /**
             * Find the first model instance based on filters
             *
             * @param type
             * @param filters
             * @returns {*}
             */
            findOneBy: function(type, filters) {
                var deferred = $q.defer();
                var self = this;
                AngularDataRestAdapter.findBy(type, filters).then(function(hashes) {
                    if (hashes.length !== 0) {
                        var record = AngularDataSerializer.unserialize(models[type], hashes[0]);
                        self.load(record);
                        deferred.resolve(record);
                    } else {
                        deferred.reject();
                    }
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
            }
        };
    }]
});
