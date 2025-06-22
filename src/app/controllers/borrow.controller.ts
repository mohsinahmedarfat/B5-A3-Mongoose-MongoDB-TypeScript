import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // static method
    await Book.borrowBook(body.book, body.quantity);

    const borrowBook = await Borrow.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error borrowing book",
      error: error.message
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const borrowBooks = await Borrow.aggregate([
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
        book: {
          title: "$_id.title",
          isbn: "$_id.isbn",
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error retrieving borrowed books summary",
      error: error
    });
  }
});
