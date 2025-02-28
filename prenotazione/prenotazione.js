document.addEventListener("DOMContentLoaded", function () {
  // Seleziona gli elementi del form di prenotazione
  const nomeInput = document.querySelector(
    'input[placeholder="Inserisci il nome"]'
  );
  const cognomeInput = document.querySelector(
    'input[placeholder="Inserisci il cognome"]'
  );
  const dataNascitaInput = document.querySelector('input[type="date"]');
  const cfInput = document.querySelector(
    'input[placeholder="Inserisci il codice fiscale"]'
  );
  const termsCheckbox = document.getElementById("terms");
  const privacyCheckbox = document.getElementById("privacy");
  const submitButton = document.querySelector('button[type="submit"]');

  // Aggiungi asterischi per i campi obbligatori
  function addRequiredAsterisks() {
    // Aggiungi asterischi ai titoli dei campi
    const labels = document.querySelectorAll(".card-body h6");
    labels.forEach((label) => {
      label.innerHTML += ' <span class="text-danger">*</span>';
    });

    // Aggiungi asterischi alle checkbox
    const checkboxLabels = document.querySelectorAll(".form-check-label");
    checkboxLabels.forEach((label) => {
      label.innerHTML += ' <span class="text-danger">*</span>';
    });

    // Aggiungi stile CSS per gli asterischi
    const style = document.createElement("style");
    style.textContent = `
        .text-danger {
          color: red;
        }
      `;
    document.head.appendChild(style);
  }

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
        // Reindirizza alla pagina di login se il token non è valido
        window.location.href = "../login/login.html";
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

        // Popola gli input del form di prenotazione
        nomeInput.value = user.nome || "";
        cognomeInput.value = user.cognome || "";
        cfInput.value = user.codiceFiscale || "";

        // Gestione della data di nascita
        if (user.dataNascita) {
          // Formatta la data nel formato richiesto da input type="date" (YYYY-MM-DD)
          const dataNascita = new Date(user.dataNascita);
          const formattedDate = dataNascita.toISOString().split("T")[0];
          dataNascitaInput.value = formattedDate;
        }
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  }

  // Configura il form per la prenotazione
  function setupPrenotazioneForm() {
    // Aggiungi gli asterischi per i campi obbligatori
    addRequiredAsterisks();

    // Gestisci il submit del form
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();

      // Verifica che tutti i campi obbligatori siano compilati
      if (
        !nomeInput.value ||
        !cognomeInput.value ||
        !dataNascitaInput.value ||
        !cfInput.value
      ) {
        alert("Compila tutti i campi obbligatori");
        return;
      }

      // Verifica che entrambe le checkbox siano selezionate
      if (!termsCheckbox.checked || !privacyCheckbox.checked) {
        alert(
          "Devi accettare i Termini e Condizioni e la Privacy Policy per procedere"
        );
        return;
      }

      // Mostra messaggio di conferma con link alla home
      const confirmationMessage = `
          Prenotazione effettuata con successo!

          Vuoi tornare alla home page?
        `;

      if (confirm(confirmationMessage)) {
        // Reindirizza alla home page
        window.location.href = "../homepage/homepage.html";
      }
    });

    // Carica i dati dell'utente
    fetchUserDetails();
  }

  // Inizializza il form
  setupPrenotazioneForm();
});
