import { CreatedResponse, SuccessResponse } from "../core/success.response.js"
import AuthService from "../services/auth.service.js"


class AuthController {
  async createAccount(req, res, next) {
    try {
      const { username, permissions } = req.body
      new CreatedResponse({
        message: "Create account success",
        metadata: await AuthService.createAccount({ username, permissions })
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const { accessToken, refreshToken } = await AuthService.login({ username, password })
      const cookies = {
        accessToken,
        refreshToken
      }
      new SuccessResponse({
        metadata: { accessToken, refreshToken }
      }).send({ res, cookies })
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body
      await AuthService.changePassword({ idAccount: req.idAccount, oldPassword, newPassword })
      new SuccessResponse({
        message: "Change password success"
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
      await AuthService.logout(req.idAccount)
      new SuccessResponse({
        message: "Logout success"
      }).send({ res, cookies })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController