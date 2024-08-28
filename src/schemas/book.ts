import { z } from "zod";

export const createBookSchema = z.object({
   title: z.string().min(1),
   cover: z.string().min(1),
   pages: z.number().min(1),
   rating: z.number().min(1),
   synopsis: z.string().optional(),
   authorId: z.number().min(1),
}).strict()
export const updateBookSchema = createBookSchema.partial()