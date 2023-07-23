import { QueryFailedError } from "typeorm"
import { ErrorResponse } from "../core/error.response.js"
import chalk from "chalk"

const handleError = (error) => {
  const mode = process.env.NODE_ENV
  if(mode === "dev"){
    console.log(chalk.bgRed.bold("Root console error") + ": ", error)
  } else if(error instanceof QueryFailedError) {
    return new ErrorResponse("Excuse query failed")
  }
  return error
}

export default handleError