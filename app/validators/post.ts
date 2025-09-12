import vine from '@vinejs/vine'

export const createPost = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string(),
    category_id: vine.string(),
    image: vine.file({
      size: '4mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })
)
