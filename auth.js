// auth.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elementos do DOM
const authForm = document.getElementById("authForm");
const authMsg = document.getElementById("authMsg");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const authBtn = document.getElementById("authBtn");

let isLogin = true; // true = login, false = cadastro

// Função para exibir mensagem
const showMsg = (text, type="success") => {
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};

// Alternar entre login e cadastro
toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Cadastro";
  authBtn.textContent = isLogin ? "Entrar" : "Cadastrar";
  toggleForm.textContent = isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login";
  authMsg.textContent = "";
  authForm.reset();
});

// Evento de submit do formulário
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("authEmail").value.trim().toLowerCase();
  const password = document.getElementById("authPass").value;

  if(isLogin){
    // LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) return showMsg("Erro: " + error.message, "error");
    showMsg("Login realizado com sucesso!", "success");
  } else {
    // CADASTRO
    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error) return showMsg("Erro: " + error.message, "error");
    showMsg("Cadastro realizado com sucesso! Verifique seu email para confirmar.", "success");
  }

  authForm.reset();
});
