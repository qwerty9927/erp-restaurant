import { validationResult } from "express-validator"
import { CreatedResponse, SuccessResponse } from "../core/success.response.js"
import AuthService from "../services/auth.service.js"
import { UnprocessableContentRequest } from "../core/error.response.js"
import { pickUpContentResponse } from "../utils/index.js"

class AuthController {
  async createAccount(req, res, next) {
    try {
      const { username, permissions } = req.body
      new CreatedResponse({
        message: "Create account success",
        metadata: await AuthService.createAccount({ username, permissions }),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const validator = validationResult(req)
      if(!validator.isEmpty()) {
        throw new UnprocessableContentRequest(pickUpContentResponse(validator.array()))
      }
      const { username, password } = req.body
      const { accessToken, refreshToken } = await AuthService.login({
        username,
        password,
      })
      const cookies = {
        accessToken,
        refreshToken,
      }
      new SuccessResponse({
        metadata: { accessToken, refreshToken },
      }).send({ res, cookies })
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body
      await AuthService.changePassword({
        idAccount: req.idAccount,
        oldPassword,
        newPassword,
      })
      new SuccessResponse({
        message: "Change password success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const cookies = {
        accessToken: null,
        refreshToken: null,
      }
      console.log(cookies)
      await AuthService.logout(req.idAccount)
      new SuccessResponse({
        message: "Logout success",
      }).send({ res, cookies })
    } catch (error) {
      next(error)
    }
  }

  async lockAccount(req, res, next) {
    try {
      const { idAccount } = req.body
      await AuthService.lockAccount(idAccount)
      new SuccessResponse({
        message: "Lock account success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async unLockAccount(req, res, next) {
    try {
      const { idAccount } = req.body
      await AuthService.unLockAccount(idAccount)
      new SuccessResponse({
        message: "UnLock account success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async modifyPermission(req, res, next) {
    try {
      const { permissions } = req.body
      await AuthService.modifyPermission({
        idAccount: req.idAccount,
        permissions,
      })
      new SuccessResponse({
        message: "Modify permission success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async phoneNumberVerification(req, res, next) {
    try {
      const validator = validationResult(req)
      if(!validator.isEmpty()) {
        throw new UnprocessableContentRequest(pickUpContentResponse(validator.array()))
      }
      const { phoneNumber } = req.body
      await AuthService.phoneNumberVerification(phoneNumber)
      new SuccessResponse({
        message: "Verify phone number success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async register(req, res, next) {
    try {
      const validator = validationResult(req)
      if(!validator.isEmpty()) {
        throw new UnprocessableContentRequest(pickUpContentResponse(validator.array()))
      }
      new SuccessResponse({
        message: "Verify phone number success",
        metadata: await AuthService.register(req.body),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { emailToken } = req.query
      new SuccessResponse({
        message: "Verify phone number success",
        metadata: await AuthService.verifyEmail(emailToken),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
