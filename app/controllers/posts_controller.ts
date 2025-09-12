import { PostService } from '#services/post_service'
import { createPost } from '#validators/post'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class PostsController {
  constructor(protected postService: PostService) {}

  public async findAllPosts({ response }: HttpContext) {
    try {
      const posts = await this.postService.findAll()
      return response.status(200).send(posts)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async findPostsByCategory({ response, request }: HttpContext) {
    try {
      const id = request.param('id')
      const postsByCategory = await this.postService.findByCategory(id)
      return response.status(200).send(postsByCategory)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async findPostsBySlug({ response, request }: HttpContext) {
    try {
      const slug = request.param('slug')
      const postsById = await this.postService.findBySlug(slug)
      return response.status(200).send(postsById)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async createPost({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createPost)
      const createdPost = await this.postService.create(payload)
      return response.status(201).send(createdPost)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async removePost({ response, request }: HttpContext) {
    try {
      const id = request.param('id')
      const deletedPost = await this.postService.remove(id)
      return response.status(200).send(deletedPost)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
