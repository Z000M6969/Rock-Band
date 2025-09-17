import { supabase } from "./supabaseClient.js";

window.addEventListener("load", async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(userError) throw userError;

    if(!user){
      window.location.href = "index.html"; // se não estiver logado
      return;
    }

    // Busca perfil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if(profileError) throw profileError;

    document.getElementById("userName").textContent = profile.full_name;
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
