import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// URL do Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";

// Chave anônima (JWT que você me passou)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

// Inicializa Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exemplo rápido de teste: pegar usuários cadastrados
async function test() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) console.error(error);
  else console.log(data);
}

test();


// Elementos
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.pane');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMsg = document.getElementById('authMsg');

// Mensagens
const showMsg = (text, type="success") => {
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};
const clearMsg = () => showMsg("");

// Troca de abas
tabs.forEach(tab => {
  tab.addEventListener('click', ()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    panes.forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Cadastro
registerForm?.addEventListener('submit', async (e)=>{
  e.preventDefault(); clearMsg();
  const nome = document.getElementById('regNome').value.trim();
  const dob = document.getElementById('regNascimento').value;
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const telefone = document.getElementById('regTelefone').value.trim();
  const usuario = document.getElementById('regUsuario').value.trim().toLowerCase();
  const senha = document.getElementById('regSenha').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: { data: { full_name: nome, dob, phone: telefone, username: usuario } }
  });

  if(error) showMsg("Erro: "+error.message,"error");
  else {
    showMsg("Conta criada! Verifique seu e-mail.", "success");
    registerForm.reset();
    document.querySelector('.tab[data-tab="login-pane"]').click();
  }
});

// Login
loginForm?.addEventListener('submit', async (e)=>{
  e.preventDefault(); clearMsg();
  const user = document.getElementById('loginUser').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email: user, password: pass });

  if(error) showMsg("Erro: "+error.message,"error");
  else showMsg("Login realizado!", "success");
});

