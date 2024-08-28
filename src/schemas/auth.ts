import { z } from "zod";

export const createUserSchema = z.object({
   username: z.string().min(5, { message: "username minimum length is 5 characters!" }),
   password: z.string().min(5, { message: "password minimum length is 5 characters!" }),
})
export const loginSchema = z.object({
   username: z.string({ required_error: 'Username is required' }).min(1),
   password: z.string({ required_error: 'Password is required' }).min(1),
})
// export const updateUserSchema = createUserSchema.partial()