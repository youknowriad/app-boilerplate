// Loading Config
var config = require("../config/config");

// Loading Express
var express = require("express");
var app = express();
var port = 3700;
app.use(express.bodyParser());

// Configuring the database
var mongoose = require('mongoose');
mongoose.connect(config.db);

// Loading Resources
var models = require("./loader/models")(config, mongoose);
require("./loader/controllers")(config, app, models);

// Lanching the application
app.listen(port);
console.log("Listening on port " + port);
