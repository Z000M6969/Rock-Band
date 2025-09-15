// app.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm&quot;;

// ===== CONFIG SUPABASE =====
const SUPABASE_URL = "https://xxxxxxxxxxxxxxxxxxx.supabase.co&quot;;   // troque
const SUPABASE_ANON_KEY = "coloque aqui seu API";             // troque
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

    let userOrEmail = document.getElementById('loginUser').value.trim().toLowerCase();
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
  } else {
    privateArea.classList.add('hidden');
  }
});

// ===== LOGOUT =====
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    showMsg("Você saiu da conta.", "success");
  });
}


window.addEventListener('load', () => {
  // ------------------------
  // HEADER - Carrossel Principal
  // ------------------------
  const headerTrack = document.querySelector('.carousel');
  if(headerTrack){
    headerTrack.innerHTML += headerTrack.innerHTML; // Duplica imagens
    let posHeader = 0;
    const speedHeader = 1; // pixels por frame

    function animateHeader() {
      posHeader += speedHeader;
      if (posHeader >= headerTrack.scrollWidth / 2) posHeader = 0;
      headerTrack.style.transform = `translateX(-${posHeader}px)`;
      requestAnimationFrame(animateHeader);
    }
    animateHeader();
  }

  // ------------------------
  // BANDAS - Carrossel de Bandas
  // ------------------------
  document.querySelectorAll('.band-track').forEach(track => {
    if(track){
      track.innerHTML += track.innerHTML; // Duplica imagens para loop
      let posBand = 0;
      const speedBand = 2;
      let paused = false;

      function animateBand() {
        if(!paused){
          posBand += speedBand;
          if(posBand >= track.scrollWidth / 2) posBand = 0;
          track.style.transform = `translateX(-${posBand}px)`;
        }
        requestAnimationFrame(animateBand);
      }
      animateBand();

      track.parentElement.addEventListener('mouseenter', () => paused = true);
      track.parentElement.addEventListener('mouseleave', () => paused = false);
    }
  });

  // ------------------------
  // NOTÍCIAS FALSAS COM LINKS REAIS
  // ------------------------
  const container = document.getElementById("feed");
  if(container){
    container.innerHTML = ""; // Limpa conteúdo inicial

    const noticias = [
      {title: "Banda X lança novo álbum", link:"https://www.whiplash.net/news/12345.html", description:"Riffs pesados e letras marcantes."},
      {title: "Festival Rock Y confirmado para 2025", link:"https://www.whiplash.net/news/67890.html", description:"Grandes nomes do cenário nacional."},
      {title: "Banda Z anuncia turnê pelo Brasil", link:"https://www.whiplash.net/news/11223.html", description:"Shows memoráveis em várias cidades."},
      {title: "Entrevista exclusiva com Banda W", link:"https://www.whiplash.net/news/44556.html", description:"Banda fala sobre novo projeto."},
      {title: "Documentário sobre Rock Nacional", link:"https://www.whiplash.net/news/77889.html", description:"História do rock nacional em vídeo."}
    ];

    noticias.forEach(noticia => {
      container.innerHTML += `
        <article>
          <h3><a href="${noticia.link}" target="_blank">${noticia.title}</a></h3>
          <p>${noticia.description}</p>
        </article>
      `;
    });
  }
});
