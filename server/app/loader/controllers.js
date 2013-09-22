module.exports = function(config, app, models) {
    Object.keys(config.resources).forEach(function(name) {
        console.log('Creating Controllers for resource "' + name + '"');
        var resource = config.resources[name];
        app.get('/' + name , function(req, res){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            models[name].find(function (err, data) {
                res.end(JSON.stringify(data));
            });
        });
    });
};
