"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// schema
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});
// pre-save middleware
// bookSchema.pre("save", function (next) {
//   const book = this as IBooks;
//   if (book.copies === 0) {
//     book.available = false;
//   } else {
//     book.available = true;
//   }
//   next();
// });
bookSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.copies === 0) {
        update.available = false;
    }
    else if (update.copies) {
        update.available = true;
    }
    this.setUpdate(update);
    next();
});
// Static method
bookSchema.statics.borrowBook = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        if (book.copies < quantity) {
            throw new Error("Not enough copies available to borrow");
        }
        book.copies -= quantity;
        yield book.save();
        return book;
    });
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
