import { DataSource } from "typeorm"
import productSchema from "../entity/productSchema.js"
import categorySchema from "../entity/categorySchema.js"

const PORT = process.env.PORT_DB
const HOST = process.env.HOST_DB

const AppDataSource = new DataSource({
  type: "mysql",
  host: HOST,
  port: PORT,
  username: "root",
  password: "",
  database: "obs_db",
  entities: [productSchema, categorySchema]
})

export default AppDataSource