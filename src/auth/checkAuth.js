import jwt from "jsonwebtoken"
import _ from "lodash"
import { ForbiddenRequest } from "../core/error.response.js"
import { findAccountById, updateAccountById } from "../repository/auth.repository.js"
import { createTokenPair, createKeyPair, wrapperJwt } from "./until.js"

const checkAuth = async (req, res, next) => {
  try {
    const clientId = req.headers["x-client-id"]
    if (!clientId) {
      throw new ForbiddenRequest("Undefined user")
    }

    // Is exist user
    const foundAccount = await findAccountById({ idAccount: clientId })
    if (!foundAccount) {
      throw new ForbiddenRequest("User not found")
    }

    // verify token
    const { accessToken, refreshToken } = req.cookies
    const resultToken = _.pick(wrapperJwt(refreshToken, foundAccount.refreshKey), ["idAccount", "username"])
    jwt.verify(accessToken, foundAccount.accessKey, async (err, decoded) => {
      if (err) {
        const { accessKey, refreshKey } = createKeyPair()
        const newTokens = createTokenPair({ accessKey, refreshKey, payload: resultToken })
        await updateById({ idAccount: resultToken.idAccount, dataSet: { accessKey, refreshKey } })
        res.cookie("accessToken", newTokens.accessToken)
        res.cookie("refreshToken", newTokens.refreshToken)
      }
      req.idAccount = resultToken.idAccount
      next()
    })
  } catch (error) {
    return next(error)
  }
}

export default checkAuth