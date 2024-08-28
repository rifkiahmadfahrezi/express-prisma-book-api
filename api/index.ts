import express , { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import bookRoute from '../src/routes/book.routes'
import authorRoute from '../src/routes/author.routes'
import bodyParser = require('body-parser')
import authRoute from '../src/routes/auth.routes'

dotenv.config()

const app : Express = express()
const port = process.env.PORT || 3000

app.get('',  (( _ , res : Response) => {
  res.status(200).json({
    status: true,
    message: "Hello there 👋!"
  })
}))
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(bodyParser.json())
app.use(authRoute)
app.use(authorRoute)
app.use(bookRoute)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
})
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(501).json({
    status: false,
    message: "An error occurred",
    error,
  })
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
}) 