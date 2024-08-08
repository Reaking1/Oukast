"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = require("./config");
var app = (0, express_1.default)();
var port = config_1.config.PORT;
//Connect to MongoDB
// Express routes
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
