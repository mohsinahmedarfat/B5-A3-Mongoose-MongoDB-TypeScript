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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error creating book",
            error: error,
        });
    }
}));
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        let books;
        if (filter && sortBy && sortOrder && limit) {
            books = yield books_model_1.Book.find({ genre: filter })
                .sort({ [sortBy]: sortOrder })
                .limit(limit);
        }
        else if (filter && sortBy && sortOrder) {
            books = yield books_model_1.Book.find({ genre: filter }).sort({ [sortBy]: sortOrder });
        }
        else if (filter && limit) {
            books = yield books_model_1.Book.find({ genre: filter }).limit(limit);
        }
        else if (sortBy && sortOrder && limit) {
            books = yield books_model_1.Book.find()
                .sort({ [sortBy]: sortOrder })
                .limit(limit);
        }
        else if (filter) {
            books = yield books_model_1.Book.find({ genre: filter });
        }
        else if (sortBy && sortOrder) {
            books = yield books_model_1.Book.find().sort({ [sortBy]: sortOrder });
        }
        else if (limit) {
            books = yield books_model_1.Book.find().limit(limit);
        }
        else {
            books = yield books_model_1.Book.find();
        }
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error retrieving books",
            error: error,
        });
    }
}));
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            error: error,
        });
    }
}));
exports.booksRouter.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const book = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating book",
            error: error,
        });
    }
}));
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Error deleting book",
            error: error,
        });
    }
}));
