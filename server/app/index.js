// Loading Config
var config = require("../config/config");

// Loading Express
var express = require("express");
var app = express();
var port = 3700;

// Configuring express
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(express.bodyParser());
app.use(allowCrossDomain);

// Configuring the database
var mongoose = require('mongoose');
mongoose.connect(config.db);

// Loading Resources
var models = require("./loader/models")(config, mongoose);
require("./loader/controllers")(config, app, models);

// Lanching the application
app.listen(port);
console.log("Listening on port " + port);
