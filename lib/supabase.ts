import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://xaykoegnbfvfunhsyfhy.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhheWtvZWduYmZ2ZnVuaHN5Zmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MzYzNDIsImV4cCI6MjA3MjUxMjM0Mn0.axssdTFQvyqVW_qxXUpsbQVaj-vC2vppVjuZ1D7mA0s'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
