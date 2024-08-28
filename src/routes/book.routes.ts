import { Router } from "express";
import book from "../controllers/book";
import { validateSchema } from "../middlewares/validateSchema";
import { createBookSchema, updateBookSchema } from "../schemas/book";
import { authMiddleware } from "../middlewares/authMiddleware";

const bookRoute = Router()

bookRoute.post('/books', authMiddleware, validateSchema(createBookSchema), book.create)
bookRoute.get('/books', book.getAll)
bookRoute.get('/books/:bookId', book.getById)
bookRoute.put('/books/:bookId', authMiddleware, validateSchema(updateBookSchema), book.update)
bookRoute.delete('/books/:bookId', authMiddleware, book.delete)


export default bookRoute