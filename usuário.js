// Configurações Supabase
const SUPABASE_URL = "https://vwbbzvwluvgllkueixqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YmJ6dndsdXZnbGxrdWVpeHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg4NzksImV4cCI6MjA3MzUxNDg3OX0.vap3Az_gUqwYJ1MxFHdFDAjBx51iI9ucbGYNVb8lBfY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener("load", async () => {
  // Pega usuário logado
  const { data: { user } } = await supabase.auth.getUser();

  if(!user){
    // Se não estiver logado, redireciona para login
    window.location.href = "index.html";
    return;
  }

  // Pega perfil do usuário
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if(error){
    console.error("Erro ao buscar perfil:", error);
    return;
  }

  // Preenche dados na tela
  document.getElementById("userName").textContent = profile.name;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userPhoto").src = profile.avatar_url || "default-user.png";

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
});
