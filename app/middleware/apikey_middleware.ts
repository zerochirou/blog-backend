import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApikeyMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const apiKey = ctx.request.header('x-api-key')
    if (!apiKey || apiKey !== env.get('API_KEY')) {
      return ctx.response.unauthorized({ status: 'error', message: 'Invalid API key' })
    }
    await next()
  }
}
