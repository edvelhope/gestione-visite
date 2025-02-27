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
  fetch('http://localhost:8080/specialization/all', { 
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
    populateSpecializationSelect(data);
  })
  .catch(error => {
    console.error("Errore nel recupero delle specializzazioni:", error);
    window.alert("Recupero delle specializzazioni non andato a buon fine.");
  });
}

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

// Inserisce tutte le specializzazioni nella select tags
function populateSpecializationSelect(data) {
  const selectElement = document.getElementById('select-tags-modal');
  if (!selectElement) {
    console.error("Elemento select-tags-modal non trovato!");
    return;
  }

  selectElement.innerHTML = ''; 

  console.log(data); 

  if (data && Array.isArray(data)) { 
    data.forEach(specialization => {
      const option = document.createElement('option');
      option.value = specialization.field;
      option.textContent = specialization.field;
      selectElement.appendChild(option);
    });
  } else {
    console.error("Dati non validi o nulli:", data);
  }
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

document.addEventListener('DOMContentLoaded', () => {
  fetchAllMedicalOffices();

  const selectElement = document.getElementById('select-tags');
  selectElement.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    fetchAndPopulateFiscalCode(selectedOption);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('exampleModal');
  modalElement.addEventListener('shown.bs.modal', () => {
    fetchAllSpecializations();
  });
});




let saveTaginput;



//Funzione per creare un dottore
function createDoctor() {
  // Acquisisco i valori del codice fiscale dello studio medico e l'user depositato in localStorage
  const codiceFiscale = document.getElementById('nome').value;
  const user = JSON.parse(localStorage.getItem('newUser'));

  // Stampo i valori acquisiti
  console.log(user);
  console.log(codiceFiscale);
  console.log(saveTaginput);

  // Controllo se i campi esistano
  if (!user || !codiceFiscale || saveTaginput.length === 0) {
      window.alert('Completa tutti i campi obbligatori.');
      return;
  }

  // Convertiamo l'array di specializzazioni in una stringa separata da virgole
  const specializzazioniString = saveTaginput.join(',');

  // Url per l'endpoint
  const url = `http://localhost:8080/doctor/${encodeURIComponent(codiceFiscale)}/${encodeURIComponent(specializzazioniString)}`;

  // Mando la richiesta per creare il dottore
  fetch(url, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Mando come body l'user in formato JSON
    body: JSON.stringify(user)
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
    console.log('registrazione effettuata:', data);
    window.alert("Registrazione effettuata.");
    location.replace("../success.html");
  })
  .catch(error => {
    console.error("Errore nell'aggiunta dell'utente:", error);
    window.alert("Registrazione non andata a buon fine.");
  });
};


function resetForm() {
  //Reset del campo
  document.getElementById("nome").value = null;

  //Rimuovi i tag
  /*
  const tagContainer = document.getElementById('tags-input').parentNode;
  while (tagContainer.firstChild) {
    tagContainer.removeChild(tagContainer.firstChild);
  }
  saveTaginput = '';
  console.log(saveTaginput);*/
}


$(document).ready(function() {
  $('input[data-role="tagsinput"]').tagsinput();

  //aggiunge i tag dopo che hai cliccato il menu a tendina
  $('#select-tags, #select-tags-modal').on('change', function() {
    const selectedOptions = $(this).val();
    const tagsInput = $('#tags-input');
    selectedOptions.forEach(option => {
      if (!tagsInput.tagsinput('items').includes(option)) {
        tagsInput.tagsinput('add', option);
      }
    });
  });

  $('input[data-role="tagsinput"]').on('itemAdded', function(event) {
    let $tag = $('input[data-role="tagsinput"]').siblings('.bootstrap-tagsinput').children('.badge');
    $tag.append('<span data-role="remove" style="margin-left: 10px; cursor: pointer;">&times;</span>');
  });

  $(document).on('click', '[data-role="remove"]', function(event) {
    let $tag = $(this).closest('.badge');
    if ($tag.contents().get(0)) {
      let tagText = $tag.contents().get(0).nodeValue.trim();
      $('input[data-role="tagsinput"]').tagsinput('remove', tagText);

      console.log(saveTaginput);
      // Rimuove il tag anche da saveTaginput
      saveTaginput = saveTaginput.filter(tag => tag !== tagText);
      console.log(saveTaginput);
    }
  });

  //Aggiunta della funzione di salvataggio dei tag
  $('#save-tags').on('click', function() {
    const tagsInput = $('#tags-input').tagsinput('items');
    console.log('Tags salvati:', tagsInput); 
    saveTaginput = tagsInput;
    console.log(saveTaginput);
  });
});

$('#save-tags').on('click', function() {
  const tagsInput = $('#tags-input').tagsinput('items');
  console.log('Tags salvati:', tagsInput);
  saveTaginput = tagsInput;

  // Verifica che ci siano tag da inviare
  if (saveTaginput.length === 0) {
      window.alert('Devi selezionare almeno una specializzazione.');
      return;
  }
  console.log(saveTaginput);
});


