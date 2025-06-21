import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  const borrowBook = await Borrow.create(body);

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrowBook,
  });
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  // const borrowBooks = await Borrow.find().populate("book")
  const borrowBooks = await Borrow.aggregate([
    { $match: {} },
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
        // book: {
        //   _id: "$_id._id",
        //   title: "$_id.title",
        //   copies: "$_id.copies",
        //   available: "$_id.available",
        //   quantity: "$_id.quantity",
        // },
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
});
