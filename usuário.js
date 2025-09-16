import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener("load", async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if(!user){
    window.location.href = "login.html";
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if(error) return console.error(error);

  document.getElementById("userName").textContent = profile.name;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userPhoto").src = profile.avatar_url || "default-user.png";

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
});
