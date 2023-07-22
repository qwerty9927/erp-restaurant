import { randomBytes } from "crypto"
import jwt from "jsonwebtoken"
import { AuthFailureRequest } from "../core/error.response.js"

const createKeyPair = () => {
  const accessKey = randomBytes(64).toString('hex')
  const refreshKey = randomBytes(64).toString('hex')
  return {
    accessKey,
    refreshKey
  }
}

const createTokenPair = ({ accessKey, refreshKey, payload }) => {
  const accessToken = jwt.sign(payload, accessKey, { expiresIn: "2d" })
  const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: "7d" })
  return {
    accessToken,
    refreshToken
  }
}

const wrapperJwt= (token, key) => {
  try {
    return jwt.verify(token, key)
  } catch(error) {
    throw new AuthFailureRequest()
  }
}

export {
  createKeyPair,
  createTokenPair,
  wrapperJwt
}