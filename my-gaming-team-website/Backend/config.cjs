"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var getEnvVar = function (key, defaultValue) {
    var value = process.env[key];
    if (!value && defaultValue === undefined) {
        throw new Error("Missing environment variable: ".concat(key));
    }
    return value || defaultValue;
};
exports.config = {
    PORT: parseInt(getEnvVar('PORT', 5000), 10),
    MONGO_URI: getEnvVar('MONGO_URI'),
    DISCORD_TOKEN: getEnvVar('DISCORD_TOKEN'),
};
