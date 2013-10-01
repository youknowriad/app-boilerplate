angular.module('app-boilerplate', ['angular-data'])
    .config(['AngularDataRestAdapterProvider', function(AngularDataRestAdapterProvider) {
        AngularDataRestAdapterProvider.setBaseUrl('http://localhost:3700');
    }])

    .run(['AngularDataStore', function(AngularDataStore){
        AngularDataStore.addModel({
            name: 'user',
            attributes: [
                '_id', 'username', 'password'
            ],
            primaryKey: '_id'
        });

        AngularDataStore.findAll('user').then(function(users) {
            console.log(users);
        });
    }])
;
