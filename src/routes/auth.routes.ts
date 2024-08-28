import { Router } from "express";
import auth from "../controllers/auth";
import { validateSchema } from "../middlewares/validateSchema";
import { createUserSchema, loginSchema } from "../schemas/auth";

const authRoute = Router()

authRoute.post("/auth/register", validateSchema(createUserSchema) , auth.register)
authRoute.post("/auth/login", validateSchema(loginSchema), auth.login)

export default authRoute