import { Router } from "express";
import author from "../controllers/author";
import { validateSchema } from "../middlewares/validateSchema";
import { createAuthorSchema, updateAuthorSchema } from "../schemas/author";
import { authMiddleware } from "../middlewares/authMiddleware";


const authorRoute = Router()

authorRoute.post('/authors', authMiddleware,  validateSchema(createAuthorSchema) ,author.create)
authorRoute.get('/authors', author.getAll)
authorRoute.get('/authors/:authorId', author.getById)
authorRoute.put('/authors/:authorId', authMiddleware,  validateSchema(updateAuthorSchema), author.update)
authorRoute.delete('/authors/:authorId', authMiddleware,  author.delete)


export default authorRoute