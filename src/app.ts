import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();
// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://b5-a4-react-redux-with-backend.vercel.app",
    ],
  })
);

// routes
app.use("/", booksRouter);
app.use("/", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management app");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

export default app;
