import Express from "express"
import cors from "cors"
import { config } from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import Connection from "./db/connect.js"
import router from './routers/index.js'
import handleError from "./helpers/handleError.js"

const app = Express()

// MiddleWare
app.use(cors(
//   {
//   credentials: true
// }
))
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(morgan("dev"))
config()
app.use(cookieParser())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "Content-Type",
//     "Authorization"
//   );
//   // res.setHeader("Access-Control-Allow-Credentials", true)
//   next()
// })

// Database
Connection.connect()

// Router
app.get('/', (req, res, next) => { res.send("Hello World") })
app.use('/', router)

// Handle Error
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.statusCode = 404
  next(error)
})

app.use((error, req, res, next) => {
  error = handleError(error)
  const statusCode = error.statusCode || 500
  const code = error.code || statusCode
  const message = error.message || "Internal Server Error"
  res.status(statusCode).json({
    code,
    status: "Error",
    message
  })
})

export default app
