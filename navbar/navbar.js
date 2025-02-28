document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("navbar-container").innerHTML = `
      <div class="container-fluid">
        <a href="../homepage/homepage.html"><img src="../navbar/logo.png" alt="logo" height="50px" width="50px"/></a>
        <a class="navbar-brand" href="../homepage/homepage.html">MediCare</a>
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
              <a class="nav-link" aria-current="page" href="../homepage/homepage.html">Home</a>
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
    const userRole = localStorage.getItem("userRole"); // "Paziente", "Medico" o "Admin"

    // In base al ruolo, crea il menu appropriato
    if (userRole === "Admin") {
      // Se l'utente è autenticato, mostra il dropdown
      const userDropdown = document.createElement("li");
      userDropdown.id = "user-dropdown";
      userDropdown.className = "nav-item dropdown";
      userDropdown.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Il mio account</a>
    <ul class="dropdown-menu dropdown-menu-end mt-3">
        <li><a class="dropdown-item" href="../dashboard-admin/dashboard-admin.html">Dashboard Admin</a></li>
        <li><a class="dropdown-item" href="../elencostudi/elencoStudiMedici.html">Elenco studi medici</a></li>
        <li><a class="dropdown-item" href="" id="logout-button">Esci</a></li>
    </ul>
`;

      // Aggiunge il dropdown alla fine della lista UL
      navList.appendChild(userDropdown);
    } else if (userRole === "Medico") {
      const userDropdown = document.createElement("li");
      userDropdown.id = "user-dropdown";
      userDropdown.className = "nav-item dropdown";
      userDropdown.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Il mio account</a>
    <ul class="dropdown-menu dropdown-menu-end mt-3">
        <li><a class="dropdown-item" href="../profilo-medico/profilo-medico.html">Dashboard Medico</a></li>
    <li><a class="dropdown-item" href="" id="logout-button">Esci</a></li>
    </ul>
`;

      // Aggiunge il dropdown alla fine della lista UL
      navList.appendChild(userDropdown);
    } else if (userRole === "Paziente") {
      // Se l'utente è autenticato, mostra il dropdown
      const userDropdown = document.createElement("li");
      userDropdown.id = "user-dropdown";
      userDropdown.className = "nav-item dropdown";
      userDropdown.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Il mio account</a>
    <ul class="dropdown-menu dropdown-menu-end mt-3">
        <li><a class="dropdown-item" href="../profilo-utente/profilo-utente.html">Dashboard Paziente</a></li>
        <li><a class="dropdown-item" href="" id="logout-button">Esci</a></li>
    </ul>
`;

      // Aggiunge il dropdown alla fine della lista UL
      navList.appendChild(userDropdown);
    } else {
      // Se non c'è un ruolo definito, mostra opzioni di default o non mostra il menu profilo
      profileDropdown.innerHTML = `
    <li><a class="dropdown-item" href="/login.html">Login</a></li>
    <li><a class="dropdown-item" href="/register.html">Registrati</a></li>
  `;
    }

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
    // Se l'utente non è autenticato, mostra il bottone di registrazione e login
    // Creazione del primo elemento <li> per la registrazione

    const registerDropdown = document.createElement("li");
    registerDropdown.id = "user-dropdown";
    registerDropdown.className = "nav-item dropdown";
    registerDropdown.innerHTML = `
    <button class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Registrati gratis</button>
    <ul class="dropdown-menu dropdown-menu-end mt-3">
        <li><a class="dropdown-item" href="../register/register.html">Come paziente</a></li>
        <li><a class="dropdown-item" href="../registerDoctor/register.html"">Come dottore</a></li>
    </ul>
`;

    // const registerItem = document.createElement("li");
    // registerItem.className = "nav-item";
    // registerItem.innerHTML = `<a class="nav-link" onclick="window.location.href='../Register/register.html'" href="#">Registrati gratis</a>`;

    // Creazione del secondo elemento <li> per il login
    const loginItem = document.createElement("li");
    loginItem.className = "nav-item";
    loginItem.innerHTML = `<a class="nav-link" onclick="window.location.href='../Login/login.html'" href="#">Login</a>`;

    // Aggiunta degli elementi al menu di navigazione
    navList.appendChild(registerDropdown);
    navList.appendChild(loginItem);

    // Aggiungi l'event listener per il login simulato
    // document.getElementById("login-button").addEventListener("click", () => {
    //   localStorage.setItem("authToken", "token-di-esempio"); // Qui metteresti il vero token ricevuto dal backend
    //   updateUserUI();
    // });
  }
}
