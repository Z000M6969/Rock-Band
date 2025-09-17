// === CONFIGURAÇÃO SUPABASE ===
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "SEU_ANON_KEY_AQUI";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener("load", async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(userError) throw userError;

    if(!user){
      window.location.href = "index.html"; // redireciona para index
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if(profileError) throw profileError;

    document.getElementById("userName").textContent = profile.name;
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
