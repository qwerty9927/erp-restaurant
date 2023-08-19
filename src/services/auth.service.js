import { hash, compare } from "bcrypt"
import crypto from "crypto"
import Connection from "../db/connect.js"
import {
  AuthFailureRequest,
  BadRequest,
  ConflictRequest,
  ErrorResponse,
  NotFoundRequest,
} from "../core/error.response.js"
import {
  accountString,
  apString,
  customerString,
} from "../constance/entityName.js"
import {
  findAccountById,
  findAccountByUsername,
  updateAccountById,
  updateAccountByUsername,
} from "../repository/auth.repository.js"
import { createKeyPair, createTokenPair } from "../auth/until.js"
import sendMail from "../auth/sendMail.js"

class AuthService {
  async createAccount({ username, permissions }) {
    // Check exist account
    const foundAccount = await findAccountByUsername({
      username,
      option: [{ isLocked: 0 }, { isLocked: 1 }],
    })
    if (foundAccount) {
      throw new ConflictRequest("Account is exist")
    }

    // Handle password
    const password = username
    const passwordHash = await hash(password, 10)

    await Connection.getInstance().transaction(
      async (transactionEntityManager) => {
        // Create account
        const accountInstance = {
          username,
          password: passwordHash,
        }
        const newAccount = await transactionEntityManager
          .getRepository(accountString)
          .insert(accountInstance)

        // Create account permission
        const apInstances = permissions.map((permission) => {
          return {
            idPermission: permission,
            idAccount: newAccount.raw.insertId,
          }
        })
        const newAps = await transactionEntityManager
          .getRepository(apString)
          .insert(apInstances)
      }
    )

    return {
      accountInfo: {
        username,
        password,
      },
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
    const { accessToken, refreshToken } = createTokenPair({
      accessKey,
      refreshKey,
      payload,
    })

    // Save key pair
    const resultUpdateKeyPair = await updateAccountById({
      idAccount: foundAccount.idAccount,
      dataSet: { accessKey, refreshKey },
    })

    return {
      accessToken,
      refreshToken,
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
    const resultUpdateAccount = await updateAccountById({
      idAccount,
      dataSet: { password },
    })
  }

  async logout(idAccount) {
    // Clear key pair
    const resultUpdateAccount = await updateAccountById({
      idAccount,
      dataSet: { accessKey: null, refreshKey: null },
    })
  }

  async lockAccount(idAccount) {
    const foundAccount = await findAccountById({ idAccount })
    if (!foundAccount) {
      throw new ErrorResponse("Account not exist")
    }

    // Change lock state
    const resultUpdateLockState = await updateAccountById({
      idAccount,
      dataSet: { isLocked: 1 },
    })
  }

  async unLockAccount(idAccount) {
    const foundAccount = await findAccountById({
      idAccount,
      option: [{ isLocked: 1 }],
    })
    if (!foundAccount) {
      throw new ErrorResponse("Account not exist")
    }

    // Change lock state
    const resultUpdateLockState = await updateAccountById({
      idAccount,
      dataSet: { isLocked: 0 },
    })
  }

  async modifyPermission({ idAccount, permissions }) {
    // Find account and permission of account
    const foundAcountAndPermission = await Connection.getInstance()
      .getRepository(accountString)
      .findOne({
        where: {
          idAccount,
        },
        relations: {
          account_permissionsRelation: true,
        },
      })

    // Filter permission not exist
    const notExistPermission = permissions.filter((permission) => {
      return foundAcountAndPermission.account_permissionsRelation.every(
        (item) => {
          return item.idPermission !== permission
        }
      )
    })

    // Add permission not exist
    await Connection.getInstance()
      .getRepository(apString)
      .insert(
        notExistPermission.map((permission) => {
          return {
            idPermission: permission,
            idAccount,
          }
        })
      )
  }

  async phoneNumberVerification(phoneNumber) {
    // Check exist account
    const foundAccount = await findAccountByUsername({ username: phoneNumber })
    if (foundAccount) {
      throw new ConflictRequest("Account is exist")
    }

    // Handle phone number

    // Create temporary account
    await Connection.getInstance().getRepository(accountString).insert({
      username: phoneNumber,
    })
    return {
      isVerifiedPhoneNumber: 0,
    }
  }

  async register({ phoneNumber, email, password, customerName, ...rest }) {
    // Find account not active
    const foundAccount = await findAccountByUsername({
      username: phoneNumber,
      option: [{ isVerifiedPhoneNumber: 0 }],
    })
    if (!foundAccount) {
      throw new NotFoundRequest("Account is not exist")
    }

    if (!email) {
      return {
        userInfo: {
          phoneNumber,
          email,
          ...rest,
        },
      }
    }
    // Handle email
    // Check email is used ?
    const foundAccountUsedEmail = await Connection.getInstance()
      .getRepository(customerString)
      .findOne({
        where: {
          email,
        },
      })
    if (foundAccountUsedEmail) {
      throw new ConflictRequest("Email is used")
    }
    // Create emailToken
    const emailToken = crypto.randomBytes(64).toString("hex")
    await updateAccountByUsername({
      username: phoneNumber,
      dataSet: { emailToken },
    })
    // Send mail
    const mailStatus = await sendMail({
      email,
      emailToken,
      customerName,
    })

    // Handle password
    const passwordHash = await hash(password, 10)
    await updateAccountByUsername({
      username: phoneNumber,
      dataSet: { password: passwordHash },
    })

    // Add customer
    await Connection.getInstance()
      .getRepository(customerString)
      .insert({
        phoneNumber,
        email,
        ...rest,
        idAccount: foundAccount.idAccount,
      })

    return {
      userInfo: {
        phoneNumber,
        email,
        ...rest,
      },
      isVerifiedEmail: 0,
    }
  }

  async verifyEmail(emailToken) {
    const foundAccountWithEmailToken = await Connection.getInstance()
      .getRepository(accountString)
      .findOneBy({
        emailToken,
      })
    if (!foundAccountWithEmailToken) {
      throw new NotFoundRequest("Not found token")
    }
    const dataSet = {
      emailToken: null,
      isVerifiedEmail: 1,
    }
    await updateAccountByUsername({
      username: foundAccountWithEmailToken.username,
      dataSet,
    })
    return {
      isVerifiedEmail: 1,
    }
  }
}

export default new AuthService()
