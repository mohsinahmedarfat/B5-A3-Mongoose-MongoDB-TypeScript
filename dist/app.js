"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://b5-a4-react-redux-with-backend.vercel.app",
    ],
}));
// routes
app.use("/", books_controller_1.booksRouter);
app.use("/", borrow_controller_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management app");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: `Cannot ${req.method} ${req.originalUrl}`,
    });
});
exports.default = app;
