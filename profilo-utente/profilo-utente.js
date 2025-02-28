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

    reader.readAsDatURL(chosefile);
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
        riepilogoElementsEmail.textContent = user.email || "";



        alert("Dati aggiornati con successo!");
      } catch (error) {
        console.error("Errore durante il salvataggio:", error);
        alert("Errore durante il salvataggio dei dati. Riprova più tardi.");
      }
    });
  }

  // Gestione della visualizzazione/modifica password
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeSlashIcon = document.getElementById("eyeSlashIcon");
  const editIcon = document.querySelector(".fa-pen");

  if (eyeIcon && eyeSlashIcon) {
    // Mostra/nascondi password
    eyeIcon.addEventListener("click", function () {
      passwordInput.type = "text";
      eyeIcon.style.display = "none";
      eyeSlashIcon.style.display = "inline-block";
    });

    eyeSlashIcon.addEventListener("click", function () {
      passwordInput.type = "password";
      eyeSlashIcon.style.display = "none";
      eyeIcon.style.display = "inline-block";
    });
  }

  if (editIcon) {
    // Abilita/disabilita modifica password
    editIcon.addEventListener("click", function () {
      if (passwordInput.disabled) {
        passwordInput.disabled = false;
        passwordInput.value = ""; // Cancella il valore mascherato
        passwordInput.focus();
      } else {
        passwordInput.disabled = true;
        if (passwordInput.value === "") {
          passwordInput.value = "••••••••";
        }
      }
    });
  }

  // Carica i dati dell'utente al caricamento della pagina
  fetchUserDetails();
});
