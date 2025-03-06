// Caricamento della navbar al caricamento della pagina
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

// Richiamare l'aggiornamento della navbar al caricamento della pagina
document.addEventListener("DOMContentLoaded", updateUserUI);

// Funzione per aggiornare la navbar dinamicamente
function updateUserUI() {
  const navList = document.querySelector(".navbar-nav");
  if (!navList) return;

  const token = localStorage.getItem("authToken");

  // Rimuove tutti gli elementi esistenti nella navbar
  navList.innerHTML = `
    <li class="nav-item">
      <a class="nav-link" aria-current="page" href="../homepage/homepage.html">Home</a>
    </li>
  `;

  if (token) {
    const userRole = localStorage.getItem("userRole");

    // Definizione dei menu in base ai ruoli
    const roleMenus = {
      Admin: [
        { text: "Dashboard Admin", link: "../dashboard-admin/dashboard-admin.html" },
        { text: "Elenco studi medici", link: "../elencostudi/elencoStudiMedici.html" },
      ],
      Medico: [{ text: "Dashboard Medico", link: "../profilo-medico/profilo-medico.html" }],
      Paziente: [{ text: "Dashboard Paziente", link: "../profilo-utente/profilo-utente.html" }],
    };

    // Creazione del menu dropdown in base al ruolo
    const dropdown = document.createElement("li");
    dropdown.className = "nav-item dropdown";
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Il mio account</a>
      <ul class="dropdown-menu dropdown-menu-end mt-3">
        ${
          roleMenus[userRole]
            ?.map(
              (menuItem) => `<li><a class="dropdown-item" href="${menuItem.link}">${menuItem.text}</a></li>`
            )
            .join("") || ""
        }
        <li><a class="dropdown-item" href="#" id="logout-button">Esci</a></li>
      </ul>
    `;
    navList.appendChild(dropdown);

    // Aggiunta del listener per il logout
    document.getElementById("logout-button").addEventListener("click", handleLogout);
  } else {
    // Menu per utenti non autenticati
    const registerDropdown = document.createElement("li");
    registerDropdown.className = "nav-item dropdown";
    registerDropdown.innerHTML = `
      <button class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Registrati gratis</button>
      <ul class="dropdown-menu dropdown-menu-end mt-3">
          <li><a class="dropdown-item" href="../register/register.html">Come paziente</a></li>
          <li><a class="dropdown-item" href="../registerDoctor/register.html">Come dottore</a></li>
      </ul>
    `;

    const loginItem = document.createElement("li");
    loginItem.className = "nav-item";
    loginItem.innerHTML = `<a class="nav-link" href="../Login/login.html">Login</a>`;

    navList.appendChild(registerDropdown);
    navList.appendChild(loginItem);
  }
}

// Funzione per gestire il logout
async function handleLogout() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("Nessun token trovato per il logout.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Status Response:", response.status);

    if (response.ok) {
      console.log("Logout avvenuto con successo");
      localStorage.removeItem("authToken"); //Rimuove solo il token
      localStorage.removeItem("userRole"); //Rimuove anche il ruolo
      updateUserUI(); //Aggiorna la UI
      window.location.href = "../homepage/homepage.html";
    } else {
      const errorData = await response.json();
      console.error("Errore nel logout:", errorData);
    }
  } catch (error) {
    console.error("Errore di connessione:", error);
  }
}
