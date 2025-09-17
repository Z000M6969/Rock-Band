import { supabase } from "./supabaseClient.js";

const cadastroForm = document.getElementById("cadastroForm");
const cadastroMsg = document.getElementById("cadastroMsg");

function showMsg(el, text, type="success") {
  el.textContent = text;
  el.className = `msg ${type}`;
}

cadastroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
  const password = document.getElementById("cadastroPass").value;
  const name = document.getElementById("cadastroName").value.trim();

  try {
    // Criar usuário
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
    if(signUpError) throw signUpError;

    const userId = signUpData.user?.id || signUpData.session?.user?.id;

    // Criar perfil
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: userId, full_name: name, username: name.toLowerCase(), phone: '', created_at: new Date() }
    ]);
    if(profileError) throw profileError;

    showMsg(cadastroMsg, "Cadastro realizado com sucesso!", "success");
    cadastroForm.reset();

  } catch(err) {
    showMsg(cadastroMsg, "Erro: " + err.message, "error");
    console.error("Cadastro erro:", err);
  }
});
