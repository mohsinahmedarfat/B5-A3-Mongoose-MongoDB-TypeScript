import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";

const app: Application = express();
// middleware
app.use(express.json())
// routes
app.use("/api/books", booksRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management app");
});

export default app;
