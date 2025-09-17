import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Substitua pela sua URL e anon key
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "SUA_ANON_KEY_AQUI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

