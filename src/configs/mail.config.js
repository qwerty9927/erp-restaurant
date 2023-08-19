import { config } from "dotenv"
config()
const transportConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

const fromUser = "Qwerty9927"

export {
  transportConfig,
  fromUser
}