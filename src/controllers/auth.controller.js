import { CreatedResponse, SuccessResponse } from "../core/success.response.js"
import AuthService from "../services/auth.service.js"


class AuthController {
  async createAccount(req, res, next) {
    try {
      const { username, permissions } = req.body
      new CreatedResponse({
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
}

export default new AuthController