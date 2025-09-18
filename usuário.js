// usuario.js
import { supabase } from "./supabaseClient.js";

async function loadUser() {
  try {
    // Pega usuário ativo
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    if (!user) {
      window.location.href = "index.html";
      return;
    }

    // Busca perfil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw profileError;

    // Atualiza DOM
    document.getElementById("userName").textContent = profile.name || "Usuário";
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhoto").src = "gatinho-rock.png";

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao deslogar:", error);
      } else {
        window.location.href = "index.html";
      }
    });

  } catch (err) {
    console.error("Erro ao carregar perfil:", err);
    window.location.href = "index.html";
  }
}

// Redireciona se perder a sessão
supabase.auth.onAuthStateChange((event, session) => {
  if (!session) window.location.href = "index.html";
});

// Chama ao carregar
window.addEventListener("load", loadUser);
