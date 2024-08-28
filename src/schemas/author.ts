import { z } from "zod";

export const createAuthorSchema = z.object({
   name: z.string().min(1, { message: "Author name is required!" }),
   country: z.string().min(1, { message: "Author country is required" }),
})
export const updateAuthorSchema = createAuthorSchema.partial()