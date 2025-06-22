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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = require("../models/books.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield books_model_1.Book.findById(body.book);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    if (book.copies >= body.quantity) {
        book.copies -= body.quantity;
        yield book.save();
        if (book.copies === 0) {
            book.available = false;
            yield book.save();
        }
        const borrowBook = yield borrow_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook,
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: "Not enough copies available to borrow",
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowBooks = yield borrow_model_1.Borrow.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "book",
                foreignField: "_id",
                as: "book",
            },
        },
        { $unwind: "$book" },
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $project: {
                // book: {
                //   title: "$_id.title",
                //   isbn: "$_id.isbn",
                // },
                book: {
                    _id: "$_id._id",
                    title: "$_id.title",
                    copies: "$_id.copies",
                    available: "$_id.available",
                    quantity: "$_id.quantity",
                },
                totalQuantity: 1,
                _id: 0,
            },
        },
    ]);
    res.status(201).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: borrowBooks,
    });
}));
