import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import Category from './category.js'
import { v4 as uuid } from 'uuid'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import slugify from 'slugify'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'title' })
  declare title: string

  @column({ columnName: 'content' })
  declare content: string

  @column({ columnName: 'category_id' })
  declare categoryId: string

  @column({ columnName: 'slug' })
  declare slug: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string

  @column({ columnName: 'image_relative_path' })
  declare imageRelativePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(post: Post) {
    post.id = uuid()
  }

  @beforeSave()
  static async generateSlug(post: Post) {
    if (post.$dirty.title) {
      post.slug = slugify.default(post.title, { lower: true, strict: true })
    }
  }

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
