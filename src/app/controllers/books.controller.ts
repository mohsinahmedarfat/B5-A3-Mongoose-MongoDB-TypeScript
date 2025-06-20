import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRouter = express.Router();

booksRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  const book = await Book.create(body)

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book
  });
});
booksRouter.get("/", async (req: Request, res: Response) => {
    const books = await Book.find()

  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    data: books
  });
});
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId)

  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data: book
  });
});
booksRouter.patch("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    data: book
  });
});
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

  res.status(201).json({
    success: true,
    message: "Book deleted successfully",
    data: book
  });
});