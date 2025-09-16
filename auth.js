/// === CONFIGURAÇÃO SUPABASE ===
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === ELEMENTOS DO HTML ===
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const loginMsg = document.getElementById("loginMsg");
const cadastroMsg = document.getElementById("cadastroMsg");

// === FUNÇÃO DE MENSAGEM ===
function showMsg(el, text, type="success") {
  el.textContent = text;
  el.className = `msg ${type}`;
}

// === CADASTRO ===
cadastroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
  const password = document.getElementById("cadastroPass").value;
  const name = document.getElementById("cadastroName").value.trim();

  try {
    // Criar usuário
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
    if(signUpError) throw signUpError;

    // Criar perfil
    const { error: profileError } = await supabase.from('profiles').insert([
      { user_id: signUpData.user.id, name: name, avatar_url: "default-user.png" }
    ]);

    if(profileError) throw profileError;

    showMsg(cadastroMsg, "Cadastro realizado com sucesso!", "success");
    cadastroForm.reset();

  } catch(err) {
    showMsg(cadastroMsg, "Erro: " + err.message, "error");
    console.error("Cadastro erro:", err);
  }
});

// === LOGIN ===
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPass").value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) throw error;

    showMsg(loginMsg, "Login realizado com sucesso!", "success");

    setTimeout(() => {
      window.location.href = "usuario.html";
    }, 500);

  } catch(err) {
    showMsg(loginMsg, "Erro: " + err.message, "error");
    console.error("Login erro:", err);
  }
});
