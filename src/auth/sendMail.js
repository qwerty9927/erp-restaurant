import fs from "fs"
import ejs from "ejs"
import nodemailer from "nodemailer"
import { fromUser, transportConfig } from "../configs/mail.config.js"
import { BadRequest } from "../core/error.response.js"

const handleContentSend = ({email, emailToken, customerName}) => {
  const emailTemplate = fs.readFileSync(`./public/html/emailTemplate.html`, {
    encoding: "utf-8",
  })
  return ejs.render(emailTemplate, { email, emailToken, customerName })
}

const sendMail = async ({email, emailToken, customerName}) => {
  try {
    const transposter = nodemailer.createTransport(transportConfig)
    const mailOptions = {
      from: fromUser,
      to: email,
      subject: "Verify mail",
      text: "Tui test ne",
      html: handleContentSend({email, emailToken, customerName}),
    }
    const mailStatus = await transposter.sendMail(mailOptions)
    return mailStatus
  } catch (error) {
    throw new BadRequest()
  }
}

export default sendMail
