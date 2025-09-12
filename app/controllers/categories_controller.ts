import { CategoryService } from '#services/category_service'
import { createCategory } from '#validators/category'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class CategoriesController {
  constructor(protected categoryService: CategoryService) {}

  public async findAllCategories({ response }: HttpContext) {
    try {
      const categories = await this.categoryService.findAll()
      return response.status(200).send({ status: 'success', data: categories })
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async findCategoryById({ response, request }: HttpContext) {
    try {
      const id = request.param('id')
      const category = await this.categoryService.findById(id)
      return response.status(200).send({ status: 'success', data: category })
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async createCategory({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createCategory)
      const createdCategory = await this.categoryService.create(payload)
      return response.status(201).send({ status: 'success', data: createdCategory })
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async removeCategory({ response, request }: HttpContext) {
    try {
      const id = request.param('id')
      const deletedCategory = await this.categoryService.remove(id)
      return response.status(200).send({ status: 'success', data: deletedCategory })
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
