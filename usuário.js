// === CONFIGURAÇÃO SUPABASE ===
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener("load", async () => {
  try {
    // Pegar usuário logado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(userError) throw userError;

    if(!user){
      // Se não estiver logado, volta para login
      window.location.href = "login.html";
      return;
    }

    // Pegar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if(profileError) throw profileError;

    // Preencher dados no HTML
    document.getElementById("userName").textContent = profile.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userPhoto").src = profile.avatar_url || "default-user.png";

    // Botão de logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if(error) throw error;
        window.location.href = "login.html";
      } catch(err) {
        console.error("Erro ao deslogar:", err);
      }
    });

  } catch(err) {
    console.error("Erro ao carregar perfil:", err);
    // Se algo deu errado, redireciona para login
    window.location.href = "login.html";
  }
});
