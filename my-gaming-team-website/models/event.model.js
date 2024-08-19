"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Admin', required: true },
});
exports.default = mongoose_1.default.model('Event', EventSchema);
