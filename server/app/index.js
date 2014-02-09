// Loading Config
var Bedoon = require("bedoon"),
    config = require("../config/config"),
    express = require("express");

// Loading Express
var bedoon = new Bedoon(config);
var port = 3700;
console.log("Listening on port " + port);
bedoon.app.use(express.static(__dirname + '/../../public'));
bedoon.app.listen(port);
