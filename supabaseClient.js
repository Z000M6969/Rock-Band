// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://SEU-PROJETO.supabase.co";
const supabaseKey = "PUBLIC-ANON-KEY";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
