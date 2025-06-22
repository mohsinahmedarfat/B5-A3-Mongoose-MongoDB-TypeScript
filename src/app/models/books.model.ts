import { Model, model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

// schema
const bookSchema = new Schema<IBooks>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// pre-save middleware
bookSchema.pre("save", function (next) {
  const book = this as IBooks;

  if (book.copies === 0) {
    book.available = false;
  } else {
    book.available = true;
  }
  next();
});

// Static method
bookSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < quantity) {
    throw new Error("Not enough copies available to borrow");
  }

  book.copies -= quantity;
  await book.save(); 
  return book;
};

// Book model with static method 
interface BookModel extends Model<IBooks> {
  borrowBook(bookId: string, quantity: number): Promise<IBooks>;
}

export const Book = model<IBooks, BookModel>("Book", bookSchema);
