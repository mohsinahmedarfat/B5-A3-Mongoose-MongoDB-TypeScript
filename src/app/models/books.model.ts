import { model, Schema } from "mongoose";
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

// model
export const Book = model<IBooks>("Book", bookSchema);