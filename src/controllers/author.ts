import type { Request, Response } from "express";
import prisma from "../client";

/**
 * Description Author's class
 *
 * @class Author
 * @typedef {Author}
 */
class Author {
   /**
    * Description create author data
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void>}
    */
   async create(req : Request, res : Response): Promise<void>{
      try{
         const authorData = await prisma.author.create({
            data: {
               name: req.body.name,
               country: req.body.country
            }
         })

         res.status(201).json({
            status: true,
            message: "Author Created succesfuly!",
            data: authorData
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to insert author data!'
          })
      }
   }
   /**
    * Description get all authors data
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void>}
    */
   async getAll(req : Request, res: Response): Promise<void>{
      try{
         const authorData = await prisma.author.findMany()

         res.status(200).json({
            status: true,
            data: authorData
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to get all authors'
          })
      }
   }
   /**
    * Description get author data by authorId
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void|Response>}
    */
   async getById(req : Request, res: Response): Promise<void | Response>{
      const { authorId } = req.params
      try{
         const authorData = await prisma.author.findFirst({
            where: {
               id: authorId
            }
         })

         if(!authorData){
            return res.status(404).json({
               status: true,
               message: "Author not found"
            })
         }

         res.status(200).json({
            status: true,
            data: authorData
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to get author by id'
          })
      }
   }
   /**
    * Description delete author by authorId
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void|Response>}
    */
   async delete(req: Request, res: Response) : Promise<void | Response> {
      const { authorId } = req.params
      try{
         const authorData = await prisma.author.findFirst({
            where: {
               id: authorId
            }
         })

         if(!authorData){
            return res.status(401).json({
               status: false,
               message: 'Author not found',
            })
         }

         await prisma.author.delete({
            where: {
               id: authorId
            }
         })

         res.status(200).json({
            status: true,
            message: "Author deleted succesfully"
         })

      }catch(error){
        console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to delete author'
          })
      }

   }
   /**
    * Description update author by authorId
    *
    * @async
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise<void|Response>}
    */
   async update(req: Request, res: Response) : Promise<void|Response>{
      const { authorId } = req.params

      try {
         const authorData = await prisma.author.findFirst({
            where: {
               id: authorId
            }
         })

         if(!authorData){
            return res.status(404).json({
               status: false,
               message: "Author not found!"
            })
         }

         await prisma.author.update({
            where: {
               id: authorId
            },
            data: req.body
         })

         res.status(200).json({
            status: true,
            message: "Author updated succesfuly"
         })
         
      } catch (error) {
         console.error(error)
         res.status(500).json({
            status: true,
            message: "server error, author failed to update!"
         })
      }
   }
}


/**
 * Description Author's class instance
 *
 * @type {Author}
 */
const author: Author = new Author()
export default author