import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const loginMsg = document.getElementById("loginMsg");
const cadastroMsg = document.getElementById("cadastroMsg");

const authContainer = document.getElementById("authContainer");
const userContainer = document.getElementById("userContainer");
const userName = document.getElementById("userName");
const userAvatar = document.getElementById("userAvatar");
const logoutBtn = document.getElementById("logoutBtn");

const showMsg = (el, text, type="success") => {
  el.textContent = text;
  el.className = `msg ${type}`;
};

// CADASTRO
cadastroForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
  const password = document.getElementById("cadastroPass").value;
  const name = document.getElementById("cadastroName").value.trim();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if(error) return showMsg(cadastroMsg, "Erro: " + error.message, "error");

  // Cria perfil
  await supabase.from('profiles').insert([
    { user_id: data.user.id, name: name, avatar_url: "avatar-padrao.png" }
  ]);

  showMsg(cadastroMsg, "Cadastro realizado com sucesso!", "success");
  cadastroForm.reset();
});

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPass").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) return showMsg(loginMsg, "Erro: " + error.message, "error");

  // Puxar perfil
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', data.user.id)
    .single();

  if(profileError) return showMsg(loginMsg, "Erro ao carregar perfil", "error");

  // Mostrar área do usuário
  userName.textContent = profile.name || "Usuário";
  userAvatar.src = profile.avatar_url || "avatar-padrao.png";
  authContainer.style.display = "none";
  userContainer.style.display = "block";
});

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  userContainer.style.display = "none";
  authContainer.style.display = "block";
});
