import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yztmprfpxhvxopuvvdcy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dG1wcmZweGh2eG9wdXZ2ZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjM4ODQsImV4cCI6MjA2OTMzOTg4NH0.F_EAjbjgq6IAUTsWVLIwpbTWltgf8eg8WT-KMqGSf-c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
