// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vwbbzvwluvgllkueixqo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
