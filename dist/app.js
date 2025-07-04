"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// routes
app.use("/api/books", books_controller_1.booksRouter);
app.use("/api/borrow", borrow_controller_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management app");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: `Cannot ${req.method} ${req.originalUrl}`
    });
});
exports.default = app;
