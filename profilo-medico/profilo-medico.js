function togglePassword() {
    var passwordField = document.getElementById("passwordField");
    var eyeIcon = document.getElementById("eyeIcon");
    var eyeSlashIcon = document.getElementById("eyeSlashIcon");
  
    if (passwordField.type === "password") {
      passwordField.type = "text"; // Mostra la password
      eyeIcon.style.display = "none"; // Nasconde l'occhio aperto
      eyeSlashIcon.style.display = "inline"; // Mostra l'occhio chiuso
    } else {
      passwordField.type = "password"; // Nasconde la password
      eyeIcon.style.display = "inline"; // Mostra l'occhio aperto
      eyeSlashIcon.style.display = "none"; // Nasconde l'occhio chiuso
    }
  }
  