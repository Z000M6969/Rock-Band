import { supabase } from "./supabaseClient.js";

async function loadUser() {
  try {
    // Pega sessão ativa
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if(sessionError) throw sessionError;

    if(!session || !session.user){
      window.location.href = "index.html";
      return;
    }

    const user = session.user;

    // Busca perfil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if(profileError) throw profileError;

    document.getElementById("userName").textContent = profile.name || "Usuário";
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhoto").src = "gatinho-rock.png"; // imagem fixa

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", async () => {
      const { error } = await supabase.auth.signOut();
      if(error) console.error("Erro ao deslogar:", error);
      else window.location.href = "index.html";
    });

  } catch(err) {
    console.error("Erro ao carregar perfil:", err);
    window.location.href = "index.html";
  }
}

// Garantir que qualquer mudança na sessão redireciona corretamente
supabase.auth.onAuthStateChange((event, session) => {
  if(!session) window.location.href = "index.html";
});

// Chama a função ao carregar
window.addEventListener("load", loadUser);
