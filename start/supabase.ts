import { createClient } from '@supabase/supabase-js'
import env from './env.js'

const url = env.get('SUPABASE_URL_API')
const key = env.get('SUPABASE_KEY_API')

const supabase = createClient(url, key)
export default supabase
