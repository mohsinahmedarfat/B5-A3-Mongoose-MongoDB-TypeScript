import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  const borrowBook = await Borrow.create(body)

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrowBook
  });
});
borrowRouter.get("/", async (req: Request, res: Response) => {
    const borrowBooks = await Borrow.find().populate("book")

  res.status(201).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: borrowBooks
  });
});