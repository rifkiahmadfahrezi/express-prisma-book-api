import type { Request, Response } from "express";
import prisma from "../client";

/**
 * Description Book's class
 *
 * @class Book
 * @typedef {Book}
 */
class Book {
   /**
    * Description create book data
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void>}
    */
   async create(req : Request, res : Response): Promise<void>{
      try{
         const bookData = await prisma.book.create({
            data: req.body
         })

         res.status(201).json({
            status: true,
            message: "Book Created succesfuly!",
            data: bookData
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to insert book data!'
          })
      }
   }
   /**
    * Description get all books data
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void>}
    */
   async getAll(req : Request, res: Response): Promise<void>{
      try{
         const bookData = await prisma.book.findMany()

         res.status(200).json({
            status: true,
            data: bookData
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to get all books'
          })
      }
   }
   /**
    * Description get book data by bookId
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void|Response>}
    */
   async getById(req : Request, res: Response): Promise<void | Response>{
      const { bookId } = req.params
      try{
         const bookData = await prisma.book.findFirst({
            where: {
               id: bookId
            }
         })

         if(!bookData){
            return res.status(404).json({
               status: true,
               message: "Book not found"
            })
         }

         res.status(200).json({
            status: true,
            data: bookData
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to get book by id'
          })
      }
   }
   /**
    * Description delete book by bookId
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void|Response>}
    */
   async delete(req: Request, res: Response) : Promise<void | Response> {
      const { bookId } = req.params
      try{
         const bookData = await prisma.book.findFirst({
            where: {
               id: bookId
            }
         })

         if(!bookData){
            return res.status(401).json({
               status: false,
               message: 'Book not found',
            })
         }

         await prisma.book.delete({
            where: {
               id: bookId
            }
         })

         res.status(200).json({
            status: true,
            message: "Book deleted succesfully"
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to delete book'
          })
      }

   }
   /**
    * Description update book by bookId
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void|Response>}
    */
   async update(req: Request, res: Response) : Promise<void|Response>{
      const { bookId } = req.params

      try {
         const bookData = await prisma.book.findFirst({
            where: {
               id: bookId
            }
         })

         if(!bookData){
            return res.status(404).json({
               status: false,
               message: "Book not found!"
            })
         }

         await prisma.book.update({
            where: {
               id: bookId
            },
            data: req.body
         })

         res.status(200).json({
            status: true,
            message: "Book updated succesfuly"
         })
         
      } catch (error) {
         console.error(error)
         res.status(500).json({
            status: true,
            message: "server error, book failed to update!"
         })
      }
   }
}


/**
 * Description Book's class instance
 *
 * @type {Book}
 */
const book: Book = new Book()
export default book