import { supabase } from "./supabaseClient.js";

// ===== Função para mostrar mensagens =====
function showMsg(el, text, type = "success") {
  el.textContent = text;
  el.className = `msg ${type}`;
}

// ===== CADASTRO =====
const cadastroForm = document.getElementById("cadastroForm");
const cadastroMsg = document.getElementById("cadastroMsg");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
    const password = document.getElementById("cadastroPass").value;
    const name = document.getElementById("cadastroName").value.trim();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name } // envia para trigger criar o perfil
        }
      });

      if (error) throw error;

      showMsg(cadastroMsg, "Cadastro realizado com sucesso! Verifique seu email.", "success");
      cadastroForm.reset();

    } catch (err) {
      showMsg(cadastroMsg, "Erro: " + err.message, "error");
      console.error("Cadastro erro:", err);
    }
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPass").value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      showMsg(loginMsg, "Login realizado com sucesso!", "success");

      // redireciona após 0.5s
      setTimeout(() => {
        window.location.href = "home.html";
      }, 500);

    } catch (err) {
      showMsg(loginMsg, "Erro: " + err.message, "error");
      console.error("Login erro:", err);
    }
  });
}
