import Express from "express"
import cors from "cors"
import { config } from "dotenv"
import morgan from "morgan"
import Connection from "./db/connect.js"
import router from './routers/index.js'

const app = Express()

// MiddleWare
app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(morgan("dev"))
config()
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
// app.use("/sell", getDataMenu)
// app.use("/product", Product)
// app.use('/table/', getDataTable)
// app.use('/table/:tableCode/detailcart', findInfoTableID)
// app.use('/table/:tableCode/status', checkStatus)
// app.use('/table/:tableCode/createcart', createCart)
// app.use('/table/:cartId/addcart', addCartItem)

// Handle Error
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.statusCode = 404
  next(error)
})

app.use((error, req, res, next) => {
  console.log(error)
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
