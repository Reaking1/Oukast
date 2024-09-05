"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var dotenv_1 = require("dotenv");
var jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.config();
var secretKey = process.env.JWT_SECRET;
var authenticateJWT = function (req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
            req.user = decoded;
        }
        else {
            return res.status(401).json({ message: 'Inavid token structre' });
        }
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        else {
            return res.status(401).json({ message: 'Invail token' });
        }
    }
};
exports.authenticateJWT = authenticateJWT;
