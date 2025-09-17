// === CONFIGURAÇÃO SUPABASE ===
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener("load", async () => {
  try {
    // Pega usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(userError) throw userError;

    if(!user){
      window.location.href = "index.html"; // se não estiver logado, volta pro index
      return;
    }

    // Busca perfil na tabela profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if(profileError) throw profileError;

    // Preenche informações no HTML
    document.getElementById("userName").textContent = profile.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhoto").src = profile.avatar_url || "default-user.png";

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if(error) throw error;
        window.location.href = "index.html";
      } catch(err) {
        console.error("Erro ao deslogar:", err);
      }
    });

  } catch(err) {
    console.error("Erro ao carregar perfil:", err);
    window.location.href = "index.html";
  }
});
