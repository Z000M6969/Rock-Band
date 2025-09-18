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
      // Cria usuário com user_metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } } // salva no user_metadata
      });
      if (error) throw error;

      showMsg(cadastroMsg, "Cadastro realizado! Verifique seu email.", "success");
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

      // Redireciona para usuário.html após login
      setTimeout(() => window.location.href = "usuário.html", 500);

    } catch (err) {
      showMsg(loginMsg, "Erro: " + err.message, "error");
      console.error("Login erro:", err);
    }
  });
}

// ===== VERIFICAÇÃO DE SESSÃO =====
async function checkSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;

    if (!session || !session.user) {
      // Redireciona para login se não estiver logado
      if (!window.location.pathname.endsWith("index.html")) {
        window.location.href = "index.html";
      }
    } else {
      // Preenche dados do usuário se estiver logado
      const user = session.user;
      const nameEl = document.getElementById("userName");
      const emailEl = document.getElementById("userEmail");

      if (nameEl) nameEl.textContent = user.user_metadata?.full_name || "Usuário";
      if (emailEl) emailEl.textContent = user.email;
    }
  } catch (err) {
    console.error("Erro ao verificar sessão:", err);
    window.location.href = "index.html";
  }
}

// Chama a verificação ao carregar a página
window.addEventListener("DOMContentLoaded", checkSession);

// ===== LOGOUT =====
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "index.html";
    } catch (err) {
      console.error("Erro ao deslogar:", err);
      alert("Não foi possível sair. Tente novamente.");
    }
  });
}
