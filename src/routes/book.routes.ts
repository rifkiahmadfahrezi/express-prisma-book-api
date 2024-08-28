import { Router } from "express";
import book from "../controllers/book";
import { validateSchema } from "../middlewares/validateSchema";
import { createBookSchema, updateBookSchema } from "../schemas/book";

const bookRoute = Router()

bookRoute.post('/books', validateSchema(createBookSchema), book.create)
bookRoute.get('/books', book.getAll)
bookRoute.get('/books/:bookId', book.getById)
bookRoute.put('/books/:bookId', validateSchema(updateBookSchema), book.update)
bookRoute.delete('/books/:bookId', book.delete)


export default bookRoute