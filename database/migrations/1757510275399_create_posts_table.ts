import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable().unique()
      table.text('content', 'longtext').notNullable().unique()
      table.string('image_url').notNullable()
      table.string('image_relative_path').notNullable()
      table.string('slug').notNullable().unique()
      table
        .uuid('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
