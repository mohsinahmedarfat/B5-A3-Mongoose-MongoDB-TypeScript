# 📚 Library Management Backend (TypeScript + Mongoose + MongoDB)

A RESTful API built with **Node.js**, **Express**, **Mongoose**, and **TypeScript** to manage books in a digital library system — including borrowing functionality, dynamic filtering, sorting, and a clean API structure.

## Features

- **Book Management**: Add, view, update, and delete books
- **Filtering & Sorting**: Query books by genre, limit results, and sort by any field
- **Borrowing System**: Borrow books and auto-update stock availability
- **Aggregate Reports**: Show total borrowed quantity per book
- Built with **TypeScript**, **Express**, and **Mongoose**
- Clean API with proper success/error response format
- Ready for unit testing and scaling

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- ESLint (for code quality)
- ts-node-dev (for development)

---

## API Endpoints
### Books API
| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| POST   | `/create-book`         | Create a new book                           |
| GET    | `/books`         | Retrieve all books (with filter, sort, etc) |
| GET    | `/books/:id` | Retrieve a specific book by ID              |
| PATCH  | `/edit-book/:id` | Update a book by ID                         |
| DELETE | `/books/:id` | Delete a book by ID                         |

### Query Parameters for GET `/books`

| Query Param | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `filter`    | string | Filter by genre (e.g., `FANTASY`, `SCIENCE`) |                 |
| `sortBy`    | string | Sort by a field (e.g., `createdAt`) |
| `sort`      | string | Sort order: `asc` or `desc`                  |
| `limit`     | number | Limit the number of results 

Example:
```
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

### Borrow API

| Method | Endpoint  | Description                                     |
| ------ | --------- | ----------------------------------------------- |
| POST   | `/borrow/:bookId` | Borrow a book (`bookId`, `quantity`, `dueDate`) |
| GET    | `/borrow-summary` | Get total borrowed quantity per book            |


>  When borrowing a book, the available `copies` are automatically updated. If the stock reaches `0`, `available` is set to `false`.

## Sample Success Response
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}
```

## Sample Error Response
```json
{
  "success": false,
  "message": "Route not found",
  "error": "Cannot GET /api/unknown"
}
```


