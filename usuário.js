/// usuario.js
import { supabase } from "./supabaseClient.js";

async function init() {
  console.log("[init] start");

  // Log de mudanças de auth
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("[onAuthStateChange]", event, session);
    if (!session) {
      console.warn("[onAuthStateChange] sem sessão -> redirect");
      window.location.href = "index.html";
    }
  });

  // Se a URL vier com hash do provider (oauth), tenta parsear a sessão
  try {
    if (location.hash.includes("access_token") || location.hash.includes("refresh_token")) {
      console.log("[init] detectei tokens na URL, chamando getSessionFromUrl()");
      await supabase.auth.getSessionFromUrl().catch(e => console.warn("getSessionFromUrl falhou:", e));
      // limpa hash sem recarregar
      history.replaceState(null, "", location.pathname + location.search);
    }
  } catch (e) {
    console.warn("[init] erro ao processar hash", e);
  }

  await loadUser();
}

async function loadUser() {
  try {
    console.log("[loadUser] getSession & getUser...");
    const sessionResult = await supabase.auth.getSession();
    console.log("[loadUser] getSession ->", sessionResult);

    const userResult = await supabase.auth.getUser();
    console.log("[loadUser] getUser ->", userResult);

    // tentar obter usuário tanto por getUser() quanto por session
    const user = userResult?.data?.user || sessionResult?.data?.session?.user;
    if (!user) {
      console.warn("[loadUser] nenhum usuário encontrado, redirecionando...");
      window.location.href = "index.html";
      return;
    }

    // Busca o perfil — uso maybeSingle pra não falhar se não houver linha
    const { data: profile, error: profileError, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    console.log("[loadUser] profile fetch ->", { profile, profileError, status });

    if (profileError) {
      // Erro de permissão (RLS) ou outro — log e throw
      console.error("[loadUser] profileError", profileError);
      throw profileError;
    }

    // Se não tiver perfil, cria um temporário no front (opcional: gravar no banco)
    const displayName = profile?.name || user.user_metadata?.full_name || (user.email || "").split("@")[0] || "Usuário";

    // Atualiza DOM (certifique-se de que esses IDs existam no HTML)
    const elName = document.getElementById("userName");
    const elEmail = document.getElementById("userEmail");
    const elPhoto = document.getElementById("userPhoto");
    const logoutBtn = document.getElementById("logoutBtn");

    if (elName) elName.textContent = displayName;
    if (elEmail) elEmail.textContent = user.email || "";
    if (elPhoto) elPhoto.src = profile?.avatar_url || "gatinho-rock.png";

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("[logout] erro:", error);
          alert("Erro ao deslogar: " + error.message);
        } else {
          window.location.href = "index.html";
        }
      });
    } else {
      console.warn("[loadUser] botão logout não encontrado no DOM (#logoutBtn)");
    }

  } catch (err) {
    console.error("[loadUser] erro capturado:", err);
    // Mostra algo simples na tela (se existir)
    const errEl = document.getElementById("errorMsg");
    if (errEl) errEl.textContent = "Erro ao carregar perfil. Veja o console.";
    // redireciona pro login (mesmo comportamento que você já tinha)
    window.location.href = "index.html";
  }
}

window.addEventListener("DOMContentLoaded", init);
