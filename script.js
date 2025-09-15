// admin.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ===== CONFIG SUPABASE =====
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_AQUI"; // ⚠️ Use só a anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== ELEMENTOS =====
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.pane');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMsg = document.getElementById('authMsg');
const privateArea = document.getElementById('privateArea');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');
const usersTableBody = document.querySelector("#usersTable tbody");
const editFormContainer = document.getElementById("editFormContainer");
const editForm = document.getElementById("editForm");

// ===== FUNÇÕES =====
const showMsg = (text, type = "success") => {
  if (!authMsg) return;
  authMsg.textContent = text;
  authMsg.className = `msg ${type}`;
};
const clearMsg = () => showMsg("");

// ===== TROCA DE ABAS =====
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ===== CADASTRO =====
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();

    const nome = document.getElementById('regNome').value.trim();
    const dataNascimento = document.getElementById('regNascimento').value || null;
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const telefone = document.getElementById('regTelefone').value.trim();
    const usuario = document.getElementById('regUsuario').value.trim().toLowerCase();
    const senha = document.getElementById('regSenha').value;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { full_name: nome, dob: dataNascimento, phone: telefone, username: usuario }
        }
      });

      if (error) {
        showMsg("Erro ao cadastrar: " + error.message, "error");
        return;
      }

      showMsg("Conta criada! Verifique seu e-mail se precisar confirmar.", "success");
      registerForm.reset();
      document.querySelector('.tab[data-tab="login-pane"]').click();
    } catch (err) {
      console.error(err);
      showMsg("Erro inesperado ao cadastrar.", "error");
    }
  });
}

// ===== LOGIN =====
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();

    const userOrEmail = document.getElementById('loginUser').value.trim().toLowerCase();
    const pass = document.getElementById('loginPass').value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userOrEmail,
        password: pass
      });

      if (error) {
        showMsg("Erro ao entrar: " + error.message, "error");
        return;
      }

      showMsg("Login realizado com sucesso!", "success");
      loginForm.reset();
    } catch (err) {
      console.error(err);
      showMsg("Erro inesperado no login.", "error");
    }
  });
}

// ===== ESTADO DE AUTENTICAÇÃO =====
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    privateArea.classList.remove('hidden');
    welcomeUser.textContent = `Bem-vindo, ${session.user.user_metadata?.full_name || session.user.email}!`;
    listarUsuarios(); // Atualiza tabela
  } else {
    privateArea.classList.add('hidden');
    usersTableBody.innerHTML = "";
  }
});

// ===== LOGOUT =====
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    showMsg("Você saiu da conta.", "success");
  });
}

// ===== LISTAR USUÁRIOS =====
async function listarUsuarios() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return console.error(error);

  usersTableBody.innerHTML = "";
  data.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.full_name || ""}</td>
      <td>${user.dob || ""}</td>
      <td>${user.email || ""}</td>
      <td>${user.phone || ""}</td>
      <td>${user.username || ""}</td>
      <td>
        <button class="btn editBtn">Editar</button>
      </td>
    `;
    usersTableBody.appendChild(tr);

    const editBtn = tr.querySelector(".editBtn");
    editBtn.addEventListener("click", () => abrirEdicao(user));
  });
}

// ===== EDITAR USUÁRIO =====
function abrirEdicao(user) {
  editFormContainer.classList.remove("hidden");
  document.getElementById("editId").value = user.id;
  document.getElementById("editNome").value = user.full_name || "";
  document.getElementById("editNascimento").value = user.dob || "";
  document.getElementById("editEmail").value = user.email || "";
  document.getElementById("editTelefone").value = user.phone || "";
  document.getElementById("editUsuario").value = user.username || "";
}

if (editForm) {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const full_name = document.getElementById("editNome").value.trim();
    const dob = document.getElementById("editNascimento").value;
    const email = document.getElementById("editEmail").value.trim();
    const phone = document.getElementById("editTelefone").value.trim();
    const username = document.getElementById("editUsuario").value.trim();

    const { data, error } = await supabase
      .from("users")
      .update({ full_name, dob, email, phone, username })
      .eq("id", id);

    if (error) {
      showMsg("Erro ao atualizar: " + error.message, "error");
    } else {
      showMsg("Usuário atualizado com sucesso!", "success");
      editFormContainer.classList.add("hidden");
      listarUsuarios();
    }
  });
}

document.getElementById("cancelEdit")?.addEventListener("click", () => {
  editFormContainer.classList.add("hidden");
});

// ===== CARROSSEL =====
window.addEventListener('load', () => {
  const headerTrack = document.querySelector('.carousel');
  if(headerTrack){
    headerTrack.innerHTML += headerTrack.innerHTML; // duplica imagens
    let posHeader = 0;
    const speedHeader = 1;

    function animateHeader() {
      posHeader += speedHeader;
      if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
      headerTrack.style.transform = `translateX(-${posHeader}px)`;
      requestAnimationFrame(animateHeader);
    }
    animateHeader();
  }
});

