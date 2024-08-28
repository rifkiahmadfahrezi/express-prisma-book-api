import { Router } from "express";
import author from "../controllers/author";
import { validateSchema } from "../middlewares/validateSchema";
import { createAuthorSchema, updateAuthorSchema } from "../schemas/author";

const authorRoute = Router()

authorRoute.post('/authors', validateSchema(createAuthorSchema) ,author.create)
authorRoute.get('/authors', author.getAll)
authorRoute.get('/authors/:authorId', author.getById)
authorRoute.put('/authors/:authorId', validateSchema(updateAuthorSchema), author.update)
authorRoute.delete('/authors/:authorId', author.delete)


export default authorRoute