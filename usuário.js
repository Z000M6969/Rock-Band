import { supabase } from "./supabaseClient.js";

window.addEventListener("load", async () => {
  try {
    // Pega sessão ativa
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if(sessionError) throw sessionError;

    if(!session || !session.user){
      window.location.href = "index.html"; // se não estiver logado
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
    document.getElementById("userPhoto").src = profile.avatar_url || "default-user.png";

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if(error) throw error;
        window.location.href = "index.html"; // logout vai para index
      } catch(err) {
        console.error("Erro ao deslogar:", err);
      }
    });

  } catch(err) {
    console.error("Erro ao carregar perfil:", err);
    window.location.href = "index.html";
  }
});
