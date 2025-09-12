import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 as uuid } from 'uuid'
import Post from './post.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'category_name' })
  declare categoryName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(category: Category) {
    category.id = uuid()
  }

  @hasMany(() => Post)
  declare post: HasMany<typeof Post>
}
