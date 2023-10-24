import { DataSource } from "typeorm"

const PORT = process.env.PORT_DB
const HOST = process.env.HOST_DB

const AppDataSource = new DataSource({
  type: "mysql",
  host: HOST,
  port: PORT,
  username: "root",
  password: "",
  database: "obs_db",
  entities: ["src/entity/*.js"]
})


export default AppDataSource