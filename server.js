import app from "./src/app.js"

const PORT = process.env.PORT_APP
const HOST = process.env.HOST_APP

app.listen(PORT, HOST, () => {
  console.log(`Start server on PORT = ${PORT}`)
})