import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// Substitua pela sua URL e anon key
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
