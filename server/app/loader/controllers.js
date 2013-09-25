module.exports = function(config, app, models) {
    Object.keys(config.resources).forEach(function(name) {
        console.log('Creating Controllers for resource "' + name + '"');
        var resource = config.resources[name];

        // Find all resources
        app.get('/' + name , function(req, res){
            console.log('get all '+ name + 's');
            res.writeHead(200, { 'Content-Type': 'application/json'});
            models[name].find(function (err, data) {
                res.end(JSON.stringify(data));
            });
        });

        // Find one resource
        app.get('/' + name + '/:id', function(req, res) {
            console.log('get '+ name + ' : ' + req.params.id);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            models[name].findById(req.params.id, function (err, document) {
                res.end(JSON.stringify(document));
            });
        });

        // Create a resource
        app.post('/' + name, function(req, res) {
            console.log('creating a '+ name);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            var data = {};
            Object.keys(config.resources[name].schema).forEach(function(field) {
                if (undefined !== req.body[field]) {
                    data[field] = req.body[field];
                }
            });

            var document = new models[name](data);
            document.save();

            res.end(JSON.stringify(document));
        });

        // Update a resource
        app.put('/' + name + '/:id', function(req, res) {
            console.log('updating '+ name + ' : ' + req.params.id);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            models[name].findById(req.params.id, function (err, document) {
                Object.keys(config.resources[name].schema).forEach(function(field) {
                    if (undefined !== req.body[field]) {
                        document[field] = req.body[field];
                    }
                });
                document.save();

                res.end(JSON.stringify(document));
            });
        });

        // delete a resource
        app.delete('/' + name + '/:id', function(req, res) {
            console.log('deleting '+ name + ' : ' + req.params.id);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            models[name].findById(req.params.id, function (err, document) {
                document.remove();

                res.end(JSON.stringify(document));
            });
        });
    });
};
