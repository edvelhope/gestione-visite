const imgDiv = document.querySelector(".user-img");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadebtn = document.querySelector("#uploadebtn");

file.addEventListener("change", function () {
  const chosedfile = this.files[0];
  if (chosedfile) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      img.setAttribute(" src", reader.result);
    });

    reader.readAsDataURL(chosefile);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Elementi del profilo
  const nomeInput = document.getElementById("profileNome");
  const cognomeInput = document.getElementById("profileCognome");
  const cfInput = document.getElementById("profileCF");
  const dataNascitaInput = document.getElementById("profileDataNascita");
  const emailInput = document.getElementById("profileEmail");
  const passwordInput = document.getElementById("passwordField");

  // Elementi del riepilogo nella card a sinistra
  const nomeCompletoElement = document.getElementById("nomeCompleto");
  const riepilogoElementsEmail = document.getElementById("riepilogoEmail");

  // Funzione per recuperare i dati utente dall'API
  async function fetchUserDetails() {
    try {
      // Recupera il token dall'localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Token non trovato");
        return;
      }

      const response = await fetch("http://localhost:8080/user/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.error("Errore di autenticazione: token non valido o scaduto");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Errore nel recupero dei dati utente: ${response.status}`
        );
      }

      const data = await response.json();

      if (data && data.user) {
        const user = data.user;

        // Popola gli input del form di modifica
        nomeInput.value = user.nome || "";
        cognomeInput.value = user.cognome || "";
        cfInput.value = user.codiceFiscale || "";
        emailInput.value = user.email || "";

        // Gestione della data di nascita
        if (user.dataNascita) {
          // Formatta la data nel formato richiesto da input type="date" (YYYY-MM-DD)
          const dataNascita = new Date(user.dataNascita);
          const formattedDate = dataNascita.toISOString().split("T")[0];
          dataNascitaInput.value = formattedDate;
        }


        passwordInput.value = user.password;

        // Popola il riepilogo nella card a sinistra
        document.getElementById("ruoloUtente").textContent =
          user.ruolo || "Utente";
          nomeCompletoElement.textContent = `${user.nome || ''} ${user.cognome || ''}`;
        riepilogoElementsEmail.textContent = user.email || "";
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente caricato"); // Debug
  
    fetchUserReservations();
  });

  
// Conferma che il file JS è caricato
console.log("Il file JavaScript è stato caricato correttamente.");

// Ascolta l'evento DOMContentLoaded una sola volta
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente caricato.");

  // Recupera i dettagli dell'utente
  fetchUserDetails();

  // Recupera le prenotazioni dell'utente
  //fetchUserReservations();
});

// Funzione per recuperare i dettagli dell'utente
async function fetchUserDetails() {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token non trovato");
      return;
    }

    const response = await fetch("http://localhost:8080/user/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      console.error("Errore di autenticazione: token non valido o scaduto");
      return;
    }

    if (!response.ok) {
      throw new Error(`Errore nel recupero dei dati utente: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.user) {
      const user = data.user;

      // Log per confermare i dati
      console.log("Dati utente ricevuti:", user);

      // Popola gli input con i dati dell'utente
      document.getElementById("profileNome").value = user.nome || "";
      document.getElementById("profileCognome").value = user.cognome || "";
      document.getElementById("profileCF").value = user.codiceFiscale || "";
      document.getElementById("profileEmail").value = user.email || "";

      if (user.dataNascita) {
        const dataNascita = new Date(user.dataNascita).toISOString().split("T")[0];
        document.getElementById("profileDataNascita").value = dataNascita;
      }

      document.getElementById("passwordField").value = user.password || "••••••••";

      // Popola il riepilogo nella card
      document.getElementById("ruoloUtente").textContent = user.ruolo || "Utente";
      document.getElementById("nomeCompleto").textContent = `${user.nome || ""} ${user.cognome || ""}`;
      document.getElementById("riepilogoEmail").textContent = user.email || "";
    }
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli utente:", error);
  }
}

// Debug: verifica che il file JavaScript sia stato caricato
console.log("Il file JavaScript è stato caricato correttamente.");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente caricato.");

  // Test per il clic sulla scheda Prenotazioni
  const bookingsTab = document.querySelector('a[href="#bookings"]');
  if (bookingsTab) {
    console.log("Scheda 'Prenotazioni' trovata.");
    bookingsTab.addEventListener("click", () => {
      console.log("Scheda 'Prenotazioni' cliccata.");
      fetchUserReservations(); // Recupera le prenotazioni quando la scheda è cliccata
    });
  } else {
    console.error("Scheda 'Prenotazioni' non trovata.");
  }
});

// Funzione per recuperare le prenotazioni
async function fetchUserReservations() {
  console.log("fetchUserReservations è stata chiamata.");

  const token = localStorage.getItem("authToken");
  console.log("Token trovato:", token);

  if (!token) {
    console.error("Token non trovato.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Risposta API ricevuta:", response.status);

    if (!response.ok) {
      throw new Error(`Errore nella richiesta: ${response.status}`);
    }

    const reservations = await response.json();
    console.log("Prenotazioni ricevute:", reservations);

    renderReservations(reservations);
  } catch (error) {
    console.error("Errore durante il fetch:", error);
  }
}

// Funzione per creare le card delle prenotazioni
function renderReservations(reservations) {
  console.log("renderReservations è stata chiamata con:", reservations);

  const bookingsContainer = document.querySelector("#bookings");
  console.log("Contenitore bookings trovato:", bookingsContainer);

  if (!bookingsContainer) {
    console.error("Contenitore #bookings non trovato nel DOM.");
    return;
  }

  bookingsContainer.innerHTML = ""; // Resetta il contenitore

  if (!reservations || reservations.length === 0) {
    console.log("Nessuna prenotazione ricevuta.");
    bookingsContainer.innerHTML = `<p class="text-muted">Nessuna prenotazione disponibile.</p>`;
    return;
  }

  reservations.forEach((reservation) => {
    console.log("Aggiunta prenotazione:", reservation);

    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${reservation.nomePrenotazione}</h5>
        <p class="card-text">
          Data: ${new Date(reservation.data).toLocaleDateString("it-IT")} - Ore ${reservation.oraInizio}
          <br />
          ${reservation.descrizione}
        </p>
        <p class="card-text"><strong>Costo:</strong> €${reservation.costo.toFixed(2)}</p>
        <p class="card-text"><strong>Stato:</strong> ${reservation.stato}</p>
        <a href="#" class="btn btn-primary">Info</a>
      </div>
    `;

    bookingsContainer.appendChild(card);
  });
}

// Funzione per creare le card delle prenotazioni
function renderReservations(reservations) {
  console.log("renderReservations è stata chiamata con:", reservations);

  const bookingsContainer = document.querySelector("#bookings");
  console.log("Contenitore bookings trovato:", bookingsContainer);

  if (!bookingsContainer) {
    console.error("Contenitore #bookings non trovato nel DOM.");
    return;
  }

  bookingsContainer.innerHTML = ""; // Resetta il contenitore

  if (!reservations || reservations.length === 0) {
    console.log("Nessuna prenotazione ricevuta.");
    bookingsContainer.innerHTML = `<p class="text-muted">Nessuna prenotazione disponibile.</p>`;
    return;
  }

  reservations.forEach((reservation) => {
    console.log("Aggiunta prenotazione:", reservation);

    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${reservation.nomePrenotazione}</h5>
        <p class="card-text">
          Data: ${new Date(reservation.data).toLocaleDateString("it-IT")} - Ore ${reservation.oraInizio}
          <br />
          ${reservation.descrizione}
        </p>
        <p class="card-text"><strong>Costo:</strong> €${reservation.costo.toFixed(2)}</p>
        <p class="card-text"><strong>Stato:</strong> ${reservation.stato}</p>
        <a href="#" class="btn btn-primary">Info</a>
      </div>
    `;

    bookingsContainer.appendChild(card);
  });
}

  

// Evento per il pulsante "Save Changes"
const saveChangesBtn = document.getElementById("saveChanges");
if (saveChangesBtn) {
  saveChangesBtn.addEventListener("click", async function () {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Sessione scaduta. Effettua nuovamente il login.");
        return;
      }

      // Prepara i dati da inviare
      const userData = {
        nome: nomeInput.value,
        cognome: cognomeInput.value,
        codiceFiscale: cfInput.value,
        dataNascita: dataNascitaInput.value,
        email: emailInput.value,
      };

      // Controlla se la password è stata modificata
      if (passwordInput.value !== "••••••••") {
        userData.password = passwordInput.value;
      }

      // Invia i dati aggiornati al server (endpoint da adattare)
      const response = await fetch("http://localhost:8080/user/editDetails", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(
          `Errore nell'aggiornamento dei dati: ${response.status}`
        );
      }

      // Aggiorna la visualizzazione dei dati dopo il salvataggio
      nomeCompletoElement.textContent = `${userData.nome} ${userData.cognome}`;
      riepilogoElementsEmail.textContent = userData.email || ""; // Corretto qui

      alert("Dati aggiornati con successo!");
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
      alert("Errore durante il salvataggio dei dati. Riprova più tardi.");
    }
  });
}

const deleteButton = document.getElementById("delete");
console.log("Pulsante delete trovato:", deleteButton); // Log per verificare se il pulsante viene trovato

if (deleteButton) {
  deleteButton.addEventListener("click", async function () {
    console.log("Pulsante 'Elimina' cliccato."); // Log per confermare il clic

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Sessione scaduta. Effettua nuovamente il login.");
      console.error("Token non trovato. Non è possibile procedere con la richiesta.");
      return;
    }

    const confirmation = confirm("Sei sicuro di voler eliminare il tuo account? Questa operazione è irreversibile.");
    if (!confirmation) {
      console.log("Eliminazione annullata dall'utente.");
      return;
    }

    try {
      console.log("Inizio della chiamata DELETE"); // Log per avviare il fetch

      const response = await fetch("http://localhost:8080/user/details", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Risposta ricevuta:", response); // Log per la risposta

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }

      const data = await response.json();
      console.log("Risposta del server:", data); // Log del risultato
      alert("Il tuo account è stato eliminato con successo.");
      
      // Reindirizza o aggiorna la pagina
      window.location.href = "homepage\homepage.html"; // Cambia il percorso se necessario
    } catch (error) {
      console.error("Errore durante la cancellazione dell'account:", error); // Log di errori
      alert("Si è verificato un errore durante l'eliminazione del tuo account.");
    }
  });
} else {
  console.error("Pulsante delete non trovato nel DOM."); // Log nel caso il pulsante non esista
}

  // Gestione della visualizzazione/modifica password
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeSlashIcon = document.getElementById("eyeSlashIcon");
  const editIcon = document.querySelector(".fa-pen");

  // Aggiungi evento per mostrare/nascondere la password
  eyeIcon.addEventListener("click", () => {
    if (passwordField.type === "password") {
      passwordField.type = "text"; // Mostra la password
      eyeIcon.style.display = "none"; // Nascondi icona occhio aperto
      eyeSlashIcon.style.display = "inline"; // Mostra icona occhio chiuso
    }
  });

  eyeSlashIcon.addEventListener("click", () => {
    if (passwordField.type === "text") {
      passwordField.type = "password"; // Nascondi la password
      eyeSlashIcon.style.display = "none"; // Nascondi icona occhio chiuso
      eyeIcon.style.display = "inline"; // Mostra icona occhio aperto
    }
  });

  // Aggiungi evento per abilitare/disabilitare la modifica della password
  editIcon.addEventListener("click", () => {
    if (passwordField.disabled) {
      passwordField.disabled = false; // Abilita la modifica
      passwordField.focus(); // Porta il focus sull'input
      editIcon.classList.add("editing"); // Cambia stile (opzionale, per feedback visivo)
    } else {
      passwordField.disabled = true; // Disabilita la modifica
      editIcon.classList.remove("editing");
    }
  });

  // Carica i dati dell'utente al caricamento della pagina
  fetchUserDetails();
});




