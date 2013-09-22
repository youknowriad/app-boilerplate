module.exports = function(config, mongoose) {
    var models = {},
        Schema = mongoose.Schema;

    Object.keys(config.resources).forEach(function(name) {
        console.log('Creating Mongo schema for resource "' + name + '"');
        var resource = config.resources[name],
            schema = new Schema(resource.schema);
        models[name] = mongoose.model(name, schema);
    });

    return models;
}
