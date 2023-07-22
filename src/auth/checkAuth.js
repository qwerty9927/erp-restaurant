import jwt from "jsonwebtoken"
import _ from "lodash"
import { AuthFailureRequest, ForbiddenRequest } from "../core/error.response.js"
import { findUserById, updateKeyPair } from "../repository/auth.repository.js"
import { createTokenPair, createKeyPair } from "./until.js"

const checkAuth = async (req, res, next) => {
  const clientId = req.headers["x-client-id"]
  if (!clientId) {
    throw new ForbiddenRequest("Undefined user")
  }

  // is exist user
  const account = await findUserById(clientId)
  if (!account) {
    throw new ForbiddenRequest("User not found")
  }

  // verify token
  const { accessToken, refreshToken } = req.cookies
  try {
    const resultToken = _.pick(jwt.verify(refreshToken, account.refreshKey), ["idAccount", "username"])
    jwt.verify(accessToken, account.accessKey, async (err, decoded) => {
      if (err) {
        const { accessKey, refreshKey } = createKeyPair()
        const newTokens = createTokenPair({ accessKey, refreshKey, payload: resultToken })
        await updateKeyPair({accessKey, refreshKey, idAccount: resultToken.idAccount})
        res.cookie("accessToken", newTokens.accessToken)
        res.cookie("refreshToken", newTokens.refreshToken)
      }
      next()
    })
  } catch(error) {
    throw new AuthFailureRequest()
  }
}

export default checkAuth