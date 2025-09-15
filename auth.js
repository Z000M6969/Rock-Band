// auth.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Configuração do Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Elementos do DOM
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const loginMsg = document.getElementById("loginMsg");
const cadastroMsg = document.getElementById("cadastroMsg");

// Funções para mostrar mensagens
const showMsg = (el, text, type="success") => {
  el.textContent = text;
  el.className = `msg ${type}`;
};

// Evento de login
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPass").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return showMsg(loginMsg, "Erro: " + error.message, "error");
  showMsg(loginMsg, "Login realizado com sucesso!", "success");
  loginForm.reset();
});

// Evento de cadastro
cadastroForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
  const password = document.getElementById("cadastroPass").value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return showMsg(cadastroMsg, "Erro: " + error.message, "error");
  showMsg(cadastroMsg, "Cadastro realizado com sucesso! Verifique seu email.", "success");
  cadastroForm.reset();
});
