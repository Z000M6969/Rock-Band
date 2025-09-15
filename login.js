import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("loginForm");
const authMsg = document.getElementById("authMsg");

const showMsg = (text, type="success") => {
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};

loginForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const userOrEmail = document.getElementById("loginUser").value.trim().toLowerCase();
  const pass = document.getElementById("loginPass").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: userOrEmail, // Supabase só permite login por email
    password: pass
  });

  if(error){
    showMsg("Erro: " + error.message, "error");
    return;
  }

  showMsg("Login realizado com sucesso!", "success");
  loginForm.reset();
});
