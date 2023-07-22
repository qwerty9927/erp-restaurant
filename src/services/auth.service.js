import { hash, compare } from "bcrypt"
import Connection from "../db/connect.js"
import { AuthFailureRequest, ErrorResponse, NotFoundRequest } from "../core/error.response.js"
import { accountString, apString } from "../constance/entityName.js"
import { findAccountById, findAccountByUsername, updateById } from "../repository/auth.repository.js"
import { createKeyPair, createTokenPair } from "../auth/until.js"

class AuthService {
  async createAccount({ username, permissions }) {
    // Find user
    const foundAccount = await findAccountByUsername({ username })
    if (foundAccount) {
      throw new NotFoundRequest("Account is existed")
    }

    // Handle password
    const password = username
    const passwordHash = await hash(password, 10)

    // Create account 
    const accountInstance = {
      username,
      password: passwordHash
    }
    const newAccount = await Connection.getInstance().getRepository(accountString).insert(accountInstance)
    if (!newAccount) {
      throw new ErrorResponse("Create account faild")
    }

    // Create ap
    const apInstances = permissions.map(permission => {
      return {
        idPermission: permission,
        idAccount: newAccount.raw.insertId
      }
    })
    const newAps = await Connection.getInstance().getRepository(apString).insert(apInstances)
    if (!newAps) {
      throw new ErrorResponse("Apply permission failed")
    }

    return {
      accountInfo: {
        username,
        password
      }
    }
  }

  async login({ username, password }) {
    // Find account
    const foundAccount = await findAccountByUsername({ username })
    if (!foundAccount) {
      throw new NotFoundRequest("Account not exist")
    }

    // Check password
    const isMatch = await compare(password, foundAccount.password)
    if (!isMatch) {
      throw new AuthFailureRequest("Login failed")
    }

    // Generate key pair
    const payload = { idAccount: foundAccount.idAccount, username }
    const { accessKey, refreshKey } = createKeyPair()
    const { accessToken, refreshToken } = createTokenPair({ accessKey, refreshKey, payload })

    // Save key pair
    const resultUpdateKeyPair = await updateById({ idAccount: foundAccount.idAccount, dataSet: { accessKey, refreshKey } })
    if (!resultUpdateKeyPair) {
      throw new ErrorResponse("Update key failed")
    }

    return {
      accessToken,
      refreshToken
    }
  }


  async changePassword({ idAccount, oldPassword, newPassword }) {
    const account = await findAccountById({ idAccount })
    if (!account) {
      throw new ErrorResponse("Account not exist")
    }

    // Check password
    const isMatch = await compare(oldPassword, account.password)
    if (!isMatch) {
      throw new AuthFailureRequest("Current password not correct")
    }

    // Update Account
    const password = await hash(newPassword, 10)
    const resultUpdateAccount = await updateById({ idAccount, dataSet: { password } })
    if (!resultUpdateAccount) {
      throw new ErrorResponse("Update account failed")
    }
  }

  async logout(idAccount) {
    const resultUpdateAccount = await updateById({ idAccount, dataSet: { accessKey: null, refreshKey: null } })
    if (!resultUpdateAccount) {
      throw new ErrorResponse()
    }
  }

}

export default new AuthService