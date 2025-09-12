import vine from '@vinejs/vine'

export const createCategory = vine.compile(
  vine.object({
    category_name: vine.string(),
  })
)
