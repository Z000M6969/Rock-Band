// Configurações Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Seleção dos elementos
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const loginMsg = document.getElementById("loginMsg");
const cadastroMsg = document.getElementById("cadastroMsg");

// Função para mostrar mensagens
const showMsg = (el, text, type = "success") => {
  el.textContent = text;
  el.className = `msg ${type}`;
};

// ===== Cadastro =====
cadastroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
  const password = document.getElementById("cadastroPass").value;
  const name = document.getElementById("cadastroName").value.trim();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return showMsg(cadastroMsg, "Erro: " + error.message, "error");

  // Cria perfil na tabela 'profiles'
  const { error: profileError } = await supabase.from('profiles').insert([
    { user_id: data.user.id, name: name, avatar_url: "default-user.png" }
  ]);

  if(profileError) return showMsg(cadastroMsg, "Erro ao criar perfil: " + profileError.message, "error");

  showMsg(cadastroMsg, "Cadastro realizado com sucesso!", "success");
  cadastroForm.reset();
});

// ===== Login =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPass").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return showMsg(loginMsg, "Erro: " + error.message, "error");

  showMsg(loginMsg, "Login realizado com sucesso!", "success");

  // Redireciona para a tela de usuário
  setTimeout(() => {
    window.location.href = "usuario.html";
  }, 500);
});
