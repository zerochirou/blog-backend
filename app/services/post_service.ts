import Post from '#models/post'
import { inject } from '@adonisjs/core'
import { CategoryService } from './category_service.js'
import { ImageService } from './image_service.js'
import { Infer } from '@vinejs/vine/types'
import { createPost } from '#validators/post'

@inject()
export class PostService {
  constructor(
    protected categoryService: CategoryService,
    protected imageService: ImageService
  ) {}

  async findAll() {
    return await Post.all()
  }

  async findByCategory(id: string) {
    const category = await this.categoryService.findById(id)
    const posts = await Post.findManyBy('category_id', category.id)
    return {
      category: category,
      data: posts,
    }
  }

  async findBySlug(slug: string) {
    return await Post.findByOrFail('slug', slug)
  }

  async create(payload: Infer<typeof createPost>) {
    const imageUrl = await this.imageService.upload(payload.image)
    return await Post.create({
      categoryId: payload.category_id,
      title: payload.title,
      content: payload.content,
      imageUrl: imageUrl.url,
      imageRelativePath: imageUrl.fileName,
    })
  }

  async remove(id: string) {
    const post = await Post.find(id)
    const fileName: string = post?.imageRelativePath as string
    await this.imageService.remove(fileName)
    await post?.delete()
    return 'post was deleted'
  }
}
