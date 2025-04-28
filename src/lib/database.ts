
import { Database } from './database.types'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cqpuzknmednnsybsyoaz.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxcHV6a25tZWRubnN5YnN5b2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMTM2NDEsImV4cCI6MjA2MDc4OTY0MX0.8c9lsXjbT1o-LnNek94zJndfDSXH5b_G71lZ03Ay5Z8"

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
