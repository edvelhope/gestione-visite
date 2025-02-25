document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("navbar-container").innerHTML = `
      <div class="container-fluid">
        <a href="#"><img src="../navbar/logo.png" alt="logo" height="50px" width="50px"/></a>
        <a class="navbar-brand" href="#">MediCare</a>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse" id="navbarsExample09">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Forum</a>
            </li>

          </ul>
        </div>
      </div>
  `;
});


document.addEventListener("DOMContentLoaded", updateUserUI);

function updateUserUI() {
  const navList = document.querySelector(".navbar-nav"); // Seleziona la lista UL principale
  if (!navList) return;

  const token = localStorage.getItem("authToken");

  if (token) {
    // Se l'utente è autenticato, mostra il dropdown
    const userDropdown = document.createElement("li");
    userDropdown.id = "user-dropdown";
    userDropdown.className = "nav-item dropdown";
    userDropdown.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Il mio account</a>
    <ul class="dropdown-menu dropdown-menu-end mt-3">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#" id="logout-button">Esci</a></li>
    </ul>
`;

    // Aggiunge il dropdown alla fine della lista UL
    navList.appendChild(userDropdown);

    // Event listener per il logout
    document
      .getElementById("logout-button")
      .addEventListener("click", async () => {
        const token = localStorage.getItem("authToken");

        if (!token) return;

        try {
          const response = await fetch("http://localhost:8080/api/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            localStorage.clear(); // Rimuove il token dal localStorage solo se il logout è andato a buon fine
            updateUserUI(); // Aggiorna l'interfaccia utente
            window.location.href = "../homepage/homepage.html";
          } else {
            console.error("Errore nel logout:", await response.json());
          }
        } catch (error) {
          console.error("Errore di connessione:", error);
        }
      });
  } else {
    // Se l'utente non è autenticato, mostra il bottone di login
    const loginButton = document.createElement("li");
    loginButton.id = "login-button";
    loginButton.className = "nav-item";
    loginButton.innerHTML = `
      <a class="nav-link" onclick="window.location.href='../Login/login.html'" href="#">Login</a>
    `;

    // Aggiunge il bottone di login alla fine della lista UL
    navList.appendChild(loginButton);

    // Aggiungi l'event listener per il login simulato
    // document.getElementById("login-button").addEventListener("click", () => {
    //   localStorage.setItem("authToken", "token-di-esempio"); // Qui metteresti il vero token ricevuto dal backend
    //   updateUserUI();
    // });
  }
}
