"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
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
            return res.status(401).json({ message: 'Invaild token structure' });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticateJWT = authenticateJWT;
