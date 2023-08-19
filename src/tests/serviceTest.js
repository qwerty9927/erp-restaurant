import nodemailer from "nodemailer"
import fs from "fs"
import ejs from "ejs"
import { fromUser, transportConfig } from "../configs/mail.config.js"
import { BadRequest } from "../core/error.response.js"
import sendMail from "../auth/sendMail.js"

const serviceTest = async (req, res, next) => {
  const key = parseInt(req.params.key)

  switch (key) {
    // Mail service
    case 1: {
      await testMainService()
      break
    }

    // Test ejs
    case 2: {
      await testEjs()
      break
    }
  }
  res.send("Test done")
}

const testMainService = async () => {
  const mailStatus = await sendMail({email: "tanvo9927@gmail.com", emailToken: "12345", customerName: "Minh Tan"})
  console.log(mailStatus)
}

const testEjs = async () => {
  let people = ["geddy", "neil", "alex"]
  const emailTemplate = fs.readFileSync(`./public/html/emailTemplate.html`, {
    encoding: "utf-8",
  })
  const html = ejs.render(emailTemplate, { people })
  console.log(html)
}

export default serviceTest
