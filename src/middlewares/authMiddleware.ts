import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized! Token does not exist.",
    });
  }

  // Extract the token from the header`
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized! Token does not exist.",
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({
        status: false,
        message: "Error! Failed to verify JWT.",
      });
    }

    if(!user){
      console.log(user)
      return
    }

    next();
  });
};
