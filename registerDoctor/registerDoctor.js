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

// Funzione per prendere tutte le specializzazioni
function fetchAllSpecializations() {
  fetch('http://localhost:8080/specialization/all', { // Assuming this is the correct endpoint
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




function createDoctor() {
  const codiceFiscale = document.getElementById('nome').value;
  //const specializzazioni = $('#tags-input').tagsinput('items');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user);
  console.log(codiceFiscale);
  console.log(saveTaginput);



  if (!user || !codiceFiscale || saveTaginput.length === 0) {
      window.alert('Completa tutti i campi obbligatori.');
      return;
  }

  const requestData = {
      user: user,
      codiceFiscale: codiceFiscale,
      nomeSpecializzazione: saveTaginput
  };

  fetch('http://localhost:8080/doctor', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
};




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
      let tagText = $tag.contents().get(0).nodeValue.trim();
      $('input[data-role="tagsinput"]').tagsinput('remove', tagText);
  });

      //Aggiunta della funzione di salvataggio dei tag
      $('#save-tags').on('click', function() {
          const tagsInput = $('#tags-input').tagsinput('items');
          console.log('Tags salvati:', tagsInput); 
          saveTaginput= tagsInput;
      });
});