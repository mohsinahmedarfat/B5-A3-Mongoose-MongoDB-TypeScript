import { model, Schema } from "mongoose";

// schema
const bookSchema = new Schema({
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
export const Book = model("book", bookSchema);