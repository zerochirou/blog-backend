import Category from '#models/category'
import { createCategory } from '#validators/category'
import { Infer } from '@vinejs/vine/types'

export class CategoryService {
  async findAll() {
    return await Category.all()
  }

  async findById(id: string) {
    return await Category.findByOrFail('id', id)
  }

  async create(payload: Infer<typeof createCategory>) {
    return await Category.create({
      categoryName: payload.category_name,
    })
  }

  async remove(id: string) {
    const category = await Category.find(id)
    await category?.delete()
    return 'category was deleted'
  }
}
