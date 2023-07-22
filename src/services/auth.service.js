import { hash, compare } from "bcrypt"
import Connection from "../db/connect.js"
import { ErrorResponse, NotFoundRequest } from "../core/error.response.js"
import { accountString, apString } from "../constance/entityName.js"
import { findUserByUsername, updateKeyPair } from "../repository/auth.repository.js"
import { createKeyPair, createTokenPair } from "../auth/until.js"

class AuthService {
  async createAccount({ username, permissions }) {
    // Find user
    const foundAccount = await findUserByUsername(username)
    if (foundAccount) {
      throw new NotFoundRequest("User is existed")
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
    console.log("Account: ", newAccount)
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
    console.log("Account permission: ", newAps)
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
    const foundAccount = await findUserByUsername(username)
    if (!foundAccount) {
      throw new ErrorResponse("Account not exist")
    }

    // Check password
    const isMatch = await compare(password, foundAccount.password)
    if (!isMatch) {
      throw new ErrorResponse("Login failed")
    }

    // Generate key pair
    const payload = { idAccount: foundAccount.idAccount, username }
    const { accessKey, refreshKey } = createKeyPair()
    const { accessToken, refreshToken } = createTokenPair({ accessKey, refreshKey, payload })

    // Save key pair
    const resultUpdateKeyPair = await updateKeyPair({accessKey, refreshKey, idAccount: foundAccount.idAccount})
    if(!resultUpdateKeyPair){
      throw new ErrorResponse("Update key failed")
    }

    return {
      accessToken,
      refreshToken
    }
  }


  // async changePassword() {

  // }
}

export default new AuthService