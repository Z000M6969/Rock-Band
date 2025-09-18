import { supabase } from "./supabaseClient.js";

// ===== Função para mostrar mensagens =====
function showMsg(el, text, type = "success") {
  el.textContent = text;
  el.className = `msg $ {type}`;
}

// ================== CADASTRO ==================
const cadastroForm = document.getElementById("cadastroForm");
const cadastroMsg = document.getElementById("cadastroMsg");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
    const password = document.getElementById("cadastroPass").value;
    const name = document.getElementById("cadastroName").value.trim();

    try {
      // Criar usuário
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      const userId = signUpData.user?.id || signUpData.session?.user?.id;

      // Criar perfil na tabela "profiles"
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: userId,   // coluna certa na sua tabela
          name: name,        // nome do usuário
          created_at: new Date(),
        },
      ]);
      if (profileError) throw profileError;

      showMsg(cadastroMsg, "Cadastro realizado com sucesso!", "success");
      cadastroForm.reset();

    } catch (err) {
      showMsg(cadastroMsg, "Erro: " + err.message, "error");
      console.error("Cadastro erro:", err);
    }
  });
}

// ================== LOGIN ==================
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

      // Redireciona após 0,5s
      setTimeout(() => window.location.href = "usuário.html", 500);

    } catch (err) {
      showMsg(loginMsg, "Erro: " + err.message, "error");
      console.error("Login erro:", err);
    }
  });
}

// ================== VERIFICAÇÃO DE SESSÃO ==================
async function checkSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;

    if (!session || !session.user) {
      // Redireciona para login se não estiver logado
      if (!window.location.pathname.endsWith("index.html")) {
        window.location.href = "index.html";
      }
      return;
    }

    // Usuário logado
    const user = session.user;

    // Puxa perfil da tabela
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw profileError;

    // Preenche dados na página usuário
    const nameEl = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    const photoEl = document.getElementById("userPhoto");

    if (nameEl) nameEl.textContent = profile.name || "Usuário";
    if (emailEl) emailEl.textContent = user.email;
    if (photoEl) photoEl.src = profile.avatar_url || "gatinho-rock.png";

  } catch (err) {
    console.error("Erro ao verificar sessão:", err);
    if (!window.location.pathname.endsWith("index.html")) {
      window.location.href = "index.html";
    }
  }
}

// Roda a verificação ao carregar a página
window.addEventListener("DOMContentLoaded", checkSession);

// ================== LOGOUT ==================
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
