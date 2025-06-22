import { Model, model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

// schema
const bookSchema = new Schema<IBooks>({
  title: { type: String, require: true },
  author: { type: String, require: true },
  genre: {
    type: String,
    require: true,
    enum: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
  },
  isbn: { type: String, require: true, unique: true },
  description: String,
  copies: { type: Number, require: true },
  available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false
});

// create Static method to handle borrowing logic
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

  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};

interface BookModel extends Model<IBooks> {
  borrowBook(bookId: string, quantity: number): Promise<IBooks>;
}

export const Book = model<IBooks, BookModel>("Book", bookSchema);