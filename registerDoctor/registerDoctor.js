//Funzione per prendere i dati dal database di tutti gli studi medici
function fetchAllMedicalOffices() {
  fetch('http://localhost:8080/medicaloffice/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Errore API:', err);
        throw new Error(`Errore: ${err.message || "Errore durante il recupero degli studi medici"}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Studi medici:', data);
    populateMedicalOfficesSelect(data);
  })
  .catch(error => {
    console.error("Errore nel recupero degli studi medici:", error);
    window.alert("Recupero studi medici non andato a buon fine.");
  });
}

//Funzione per prendere tutte le specializzazioni
function fetchAllSpecializations() {
  fetch('http://localhost:8080/doctor/specialization', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Errore API:', err);
        throw new Error(`Errore: ${err.message || "Errore durante il recupero delle specializzazioni"}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Specializzazioni:', data);
    populateSpecializationSelect(data); // Passa i dati alla funzione per popolare il select
  })
  .catch(error => {
    console.error("Errore nel recupero delle specializzazioni:", error);
    window.alert("Recupero delle specializzazioni non andato a buon fine.");
  });
}

//Metodo per scrivere il codice fiscale in automatico
function fetchAndPopulateFiscalCode(studioNome) {
  fetch(`http://localhost:8080/medicaloffice/${studioNome}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Errore API:', err);
        throw new Error(`Errore: ${err.message || "Errore durante il recupero del codice fiscale"}`);
      });
    }
    return response.json();
  })
  .then(data => {
    if (data && data.codiceFiscale) {
      document.getElementById('nome').value = data.codiceFiscale; 
    } else {
      console.error("Codice Fiscale non trovato.");
      window.alert("Codice Fiscale non disponibile.");
    }
  })
  .catch(error => {
    console.error("Errore nel recupero del codice fiscale:", error);
    window.alert("Recupero del codice fiscale non andato a buon fine.");
  });
}



/*

---------Da rifarre


*/

//Inserisce tutti gli studi medici nella select tags
function populateMedicalOfficesSelect(data) {
  const selectElement = document.getElementById('select-tags');
  selectElement.innerHTML = ''; 

  data.forEach(office => {
    const option = document.createElement('option');
    option.value = office.nome;
    option.textContent = office.nome;
    selectElement.appendChild(option);
  });
}

// Inserisce tutte le specializzazioni
function populateSpecializationSelect(data) {
  const selectElement = document.getElementById('floatingSelect');

  // Rimuovi tutte le opzioni esistenti, tranne quella predefinita
  selectElement.innerHTML = '<option selected value="">-- Seleziona una specializzazione --</option>';

  // Aggiungi ogni specializzazione come opzione
  data.forEach((specialization, index) => {
    const option = document.createElement('option');
    option.value = index + 1; // Usa l'indice come valore (ad esempio, 1 per la prima specializzazione)
    option.textContent = specialization; // Usa direttamente il nome della specializzazione
    selectElement.appendChild(option);
  });
}



document.addEventListener('DOMContentLoaded', () => {
  fetchAllMedicalOffices();

  const selectElement = document.getElementById('select-tags');
  selectElement.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    fetchAndPopulateFiscalCode(selectedOption);
  });
});

//Al caricamento nel elemento floatingSelect
document.addEventListener('DOMContentLoaded', () => {
  fetchAllSpecializations();
});






//Funzione per creare un dottore
function createDoctor() {
  //Recupera l'opzione selezionata per la specializzazione
  const selectElement = document.getElementById("floatingSelect");
  const selectedSpecialization = selectElement.options[selectElement.selectedIndex].textContent; //Testo dell'opzione selezionata

  //Verifica che una specializzazione valida sia selezionata
  if (!selectedSpecialization || selectedSpecialization === "-- Seleziona una specializzazione --") {
    alert("Per favore, seleziona una specializzazione valida!");
    selectElement.focus();
    return; //Blocca l'esecuzione
  }

  //Acquisisci il valore del codice fiscale dallo studio medico
  const codiceFiscale = document.getElementById('nome').value;

  //Recupera l'oggetto utente dal localStorage
  const user = JSON.parse(localStorage.getItem('newUser'));

  console.log("Dati User:", user);
  console.log("Codice Fiscale:", codiceFiscale);
  console.log("Specializzazione selezionata:", selectedSpecialization);

  //Verifica che i campi obbligatori siano completi
  if (!user || !codiceFiscale) {
    window.alert('Completa tutti i campi obbligatori.');
    return;
  }

  //URL per l'endpoint
  const url = `http://localhost:8080/doctor/${encodeURIComponent(codiceFiscale)}/${encodeURIComponent(selectedSpecialization)}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          console.error('Errore API:', err);
          throw new Error(`Errore: ${err.message || "Errore durante l'aggiunta dell'utente"}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Registrazione effettuata con successo:', data);
      window.alert("Registrazione effettuata!");
      location.replace("../success.html"); // Redirect a pagina di successo
    })
    .catch(error => {
      console.error("Errore nell'aggiunta dell'utente:", error);
      window.alert("Registrazione non andata a buon fine.");
    });
}

function resetForm() {
  //Reset del campo "nome"
  document.getElementById("nome").value = null;

  //Reset della selezione della specializzazione
  const selectSpecialization = document.getElementById("floatingSelect");
  selectSpecialization.selectedIndex = 0; //Imposta la prima opzione come selezionata
}
