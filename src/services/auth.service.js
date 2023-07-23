import { hash, compare } from "bcrypt"
import Connection from "../db/connect.js"
import { AuthFailureRequest, ConflictRequest, ErrorResponse, NotFoundRequest } from "../core/error.response.js"
import { accountString, apString } from "../constance/entityName.js"
import { findAccountById, findAccountByUsername, updateById } from "../repository/auth.repository.js"
import { createKeyPair, createTokenPair } from "../auth/until.js"

class AuthService {
  async createAccount({ username, permissions }) {
    // Find user
    const foundAccount = await findAccountByUsername({ username, option: [{ isLocked: 0 }, { isLocked: 1 }] })
    if (foundAccount) {
      throw new ConflictRequest("Account is existed")
    }

    // Handle password
    const password = username
    const passwordHash = await hash(password, 10)

    await Connection.getInstance().transaction(async (transactionEntityManager) => {
      // Create account 
      const accountInstance = {
        username,
        password: passwordHash
      }
      const newAccount = await transactionEntityManager.getRepository(accountString).insert(accountInstance)

      // Create account permission
      const apInstances = permissions.map(permission => {
        return {
          idPermission: permission,
          idAccount: newAccount.raw.insertId
        }
      })
      const newAps = await transactionEntityManager.getRepository(apString).insert(apInstances)
    })

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
  }

  async logout(idAccount) {
    // Clear key pair
    const resultUpdateAccount = await updateById({ idAccount, dataSet: { accessKey: null, refreshKey: null } })
  }

  async lockAccount(idAccount) {
    const foundAccount = await findAccountById({ idAccount })
    if (!foundAccount) {
      throw new ErrorResponse("Account not exist")
    }

    // Change lock state
    const resultUpdateLockState = await updateById({ idAccount, dataSet: { isLocked: 1 } })
  }

  async unLockAccount(idAccount) {
    const foundAccount = await findAccountById({ idAccount, option: [{isLocked: 1}] })
    if(!foundAccount) {
      throw new ErrorResponse("Account not exist")
    }

    // Change lock state
    const resultUpdateLockState = await updateById({idAccount, dataSet: {isLocked: 0}})
  }
}

export default new AuthService