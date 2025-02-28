function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//Funzione per registrarsi
function addUser(newUser) {
    newUser.dataNascita = formatDate(newUser.dataNascita);
    fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //...getAuthHeaders()
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          console.error('Errore API:', err); // Aggiungi questo log per esaminare il contenuto della risposta
          throw new Error(`Errore: ${err.message || "Errore durante l'aggiunta dell'utente"}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Registrazione effettuata:', data);
      window.alert("Registrazione effettuata.");
      location.replace("../success.html");
    })
    .catch(error => {
      console.error("Errore nell'aggiunta dell'utente:", error);
      window.alert("Registrazione non andata a buon fine.");
    });
  }

  function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//Funzione per resettare i campi del form
function resetForm() {
    document.getElementById('addUserForm').reset();
  }

  //Event listener per il pulsante di reset
  document.getElementById('resetButton').addEventListener('click', function(event) {
    event.preventDefault();
    resetForm();
  });

  //DOM REGISTRAZIONE
  document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUser = {
      nome: document.getElementById('nome').value,
      cognome: document.getElementById('cognome').value,
      dataNascita: document.getElementById('dataNascita').value,
      codiceFiscale: document.getElementById('codiceFiscale').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      confPassword: document.getElementById('confPassword').value
    };

    document.getElementById('cognome').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;
    document.getElementById('nome').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;
    document.getElementById('dataNascita').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;
    document.getElementById('codiceFiscale').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;
    document.getElementById('email').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;
    document.getElementById('password').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;
    document.getElementById('confPassword').style.borderColor = window.getComputedStyle(document.getElementById('email')).borderColor;

    console.log("Dati raccolti:", newUser);

    if (!newUser.nome) {
      alert("Compila il nome.");
      document.getElementById('nome').style.borderColor = "red";
      return;
    }

    if (!newUser.cognome) {
      alert("Compila il cognome.");
      document.getElementById('cognome').style.borderColor = "red";
      return;
    }

    if (!newUser.dataNascita) {
        alert("Compila la data di nascita.");
        document.getElementById('dataNascita').style.borderColor = "red";
        return;
    }

    const age = calculateAge(newUser.dataNascita);
    if (age < 18) {
      alert("Devi avere almeno 18 anni per registrarti.");
      document.getElementById('dataNascita').style.borderColor = "red";
      return;
    }

    if (!newUser.codiceFiscale) {
      alert("Compila il codice fiscale.");
      document.getElementById('codiceFiscale').style.borderColor = "red";
      return;
    }

    if (!newUser.email) {
      alert("Compila l'email.");
      document.getElementById('email').style.borderColor = "red";
      return;
    }

    if (!newUser.password) {
      alert("Compila la password.");
      document.getElementById('password').style.borderColor = "red";
      return;
    }

    if (!newUser.confPassword) {
      alert("Compila la password di conferma.");
      document.getElementById('confPassword').style.borderColor = "red";
      return;
    }

    if (newUser.confPassword !== newUser.password) {
      alert("La password di conferma non corrisponde alla password.");
      document.getElementById('confPassword').style.borderColor = "red";
      return;
    }

    addUser(newUser);
  });
