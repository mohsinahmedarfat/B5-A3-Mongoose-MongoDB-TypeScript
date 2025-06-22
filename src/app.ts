import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";

const app: Application = express();
// middleware
app.use(express.json())
// routes
app.use("/api/books", booksRouter)
app.use("/api/borrow", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management app");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

export default app;
