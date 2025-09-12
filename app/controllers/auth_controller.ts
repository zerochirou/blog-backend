import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  public async createAdmin({ response, request }: HttpContext) {
    try {
      const data = request.only(['full_name', 'password', 'email'])
      const user = await User.create({
        fullName: data.full_name,
        email: data.email,
        password: data.password,
      })
      return user
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async login({ response, request }: HttpContext) {
    try {
      const { email, password } = await request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      return response.json({
        type: 'bearer',
        token: token.value!.release(), // ambil token string
        user,
      })
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async me({ response, auth }: HttpContext) {
    try {
      await auth.authenticate()
      return response.ok(auth.user)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
