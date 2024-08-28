import type { Request, Response } from "express";
import prisma from "../client";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const saltRounds = 10
class Auth{
   async register(req: Request, res: Response){
      try {
         const salt = await bcrypt.genSalt(saltRounds)
         const userData = await prisma.user.create({
            data: {
               username: req.body.username,
               password: await bcrypt.hash(req.body.password, salt)
            }
         })

         res.status(201).json({
            status: true,
            message: "Author Created succesfuly!",
            data: userData
         })

      } catch (error) {
         console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to register!'
          })
      }
   }

   async login(req :Request, res: Response){
      try{
         // check if user exist
         const user = await prisma.user.findFirst({
            where: {
               username: req.body.username
            }
         })

         if(!user){
            res.status(404).json({
               status: false,
               message: `Username ${req.body.username} is not registered!`
            })
         }
         // verify password
         const isPasswordValid = bcrypt.compareSync(req.body.password, user?.password as string)
         // password match
         if(isPasswordValid){
            const token = jwt.sign({
               id: user?.id
            }, process.env.JWT_ACCESS_SECRET as string, {
               expiresIn: 86400
            } )

            res.status(200).json({
               status: true,
               message: `Login success!`,
               data: {
                  token,
                  username: user?.username
               }
            })
         }else{
            res.status(401).json({
               status: false,
               message: `Login failed!, invalid credentials`,
            })
         }

         // generate token



      }catch(error){
         console.error(error)
         res.status(500).json({
            status: false,
            message: 'server error, failed to register!'
         })
      }
   }
}

const auth = new Auth()
export default auth