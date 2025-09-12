import env from '#start/env'
import supabase from '#start/supabase'
import { cuid } from '@adonisjs/core/helpers'
import fs from 'node:fs'

export class ImageService {
  async upload(file: any): Promise<any> {
    if (!file) throw new Error('No image uploaded')

    const fileBuffer = fs.readFileSync(file.tmpPath!)
    const fileName = `uploads/${Date.now()}-${cuid()}-${file.clientName}`
    const bucket = env.get('SUPABASE_BUCKET')

    const { error } = await supabase.storage.from(bucket).upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    })

    if (error) throw new Error(error.message)
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return {
      fileName,
      url: data.publicUrl,
      error: error,
    }
  }

  async remove(fileName: string) {
    if (!fileName) throw new Error('Not image deleted')
    const bucket = env.get('SUPABASE_BUCKET')

    const { error } = await supabase.storage.from(bucket).remove([fileName])
    if (error) throw new Error(error.message)

    return error
  }
}
