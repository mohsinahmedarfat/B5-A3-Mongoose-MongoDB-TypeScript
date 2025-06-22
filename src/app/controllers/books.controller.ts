import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRouter = express.Router();

booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating book",
      error: error,
    });
  }
});

booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    let books;
    if (filter && sortBy && sortOrder && limit) {
      books = await Book.find({ genre: filter })
        .sort({ [sortBy]: sortOrder })
        .limit(limit);
    } else if (filter && sortBy && sortOrder) {
      books = await Book.find({ genre: filter }).sort({ [sortBy]: sortOrder });
    } else if (filter && limit) {
      books = await Book.find({ genre: filter }).limit(limit);
    } else if (sortBy && sortOrder && limit) {
      books = await Book.find()
        .sort({ [sortBy]: sortOrder })
        .limit(limit);
    } else if (filter) {
      books = await Book.find({ genre: filter });
    } else if (sortBy && sortOrder) {
      books = await Book.find().sort({ [sortBy]: sortOrder });
    } else if (limit) {
      books = await Book.find().limit(limit);
    } else {
      books = await Book.find();
    }

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error retrieving books",
      error: error,
    });
  }
});
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Book not found",
      error: error,
    });
  }
});
booksRouter.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating book",
      error: error,
    });
  }
});
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting book",
      error: error,
    });
  }
});
