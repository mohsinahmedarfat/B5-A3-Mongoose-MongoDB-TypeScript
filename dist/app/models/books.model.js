"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// schema
const bookSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    author: { type: String, require: true },
    genre: {
        type: String,
        require: true,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: { type: String, require: true, unique: true },
    description: String,
    copies: { type: Number, require: true },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false
});
// model
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
