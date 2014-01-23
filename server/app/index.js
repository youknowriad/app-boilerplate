// Loading Config
var Bedoon = require("bedoon");
var config = require("../config/config");

// Loading Express
var bedoon = new Bedoon(config);
var port = 3700;
console.log("Listening on port " + port);
bedoon.app.listen(port);
