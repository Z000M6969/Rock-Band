window.addEventListener("load", () => {
  // Recuperar dados do localStorage
  const nome = localStorage.getItem("nome") || "Usuário";
  const email = localStorage.getItem("email") || "email@email.com";
  const senha = localStorage.getItem("senha") || "********";
  const foto = localStorage.getItem("foto") || "default-user.png";

  // Preencher na tela
  document.getElementById("userName").textContent = nome;
  document.getElementById("userEmail").textContent = email;
  document.getElementById("userPassword").textContent = senha;
  document.getElementById("userPhoto").src = foto;

  // Botão logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
  });
});
