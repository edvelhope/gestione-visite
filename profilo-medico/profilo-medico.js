const imgDiv = document.querySelector('.user-img');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadebtn = document.querySelector('#uploadebtn');


file.addEventListener('change', function() {
    const chosedfile = this.files[0];
    if (chosedfile) {
        const reader = new FileReader();

        reader.addEventListener( 'load' , function() {
            img.setAttribute (' src' , reader.result);
        })

        reader.readAsDatURL (chosefile);
    }
})

//Per modificare la bio
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

document.querySelector('.edit-icon').addEventListener('click', function(e) {
  e.preventDefault();
  const textarea = e.target.closest('p').querySelector('.editable');
  
  if (textarea.hasAttribute('readonly')) {
    textarea.removeAttribute('readonly');
    textarea.focus();
  } else {
    textarea.setAttribute('readonly', true);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const textareas = document.querySelectorAll('.editable');
  textareas.forEach(textarea => autoResize(textarea));
});

/*
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
  
    // Effettua la richiesta fetch per ottenere i dettagli
    fetch('http://localhost:8080/user/details', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Richiesta avvenuta con successo");
  
        // Popolamento dei campi direttamente tramite ID
        document.getElementById('nome').value = data.user.nome || '';
        document.getElementById('cognome').value = data.user.cognome || '';
        document.getElementById('email').value = data.user.email || '';
        document.getElementById('studioMedico').value = data.doctor?.studioMedico?.nome || '';
  
        // Gestione della select "Specializzazioni"
        const selectElement = document.getElementById('spec');
        if (selectElement && data.doctor?.specializzazioni?.length) {
          // Cancella eventuali opzioni esistenti
          selectElement.innerHTML = '<option selected></option>';
  
          // Aggiungi le opzioni delle specializzazioni
          data.doctor.specializzazioni.forEach(spec => {
            const option = document.createElement('option');
            option.value = spec.specializationId;
            option.textContent = spec.nome;
            selectElement.appendChild(option);
          });
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata fetch:', error);
      });
  });*/

  document.getElementById('file').addEventListener('change', () => {
    const file = document.getElementById('file').files[0]; // File selezionato

    if (!file) {
        alert("Seleziona un file prima di procedere.");
        return;
    }

    console.log('File selezionato:', file);

    const formData = new FormData();
    formData.append('file', file); // Chiave 'file' corrisponde a @RequestParam("file") nel backend

    const token = localStorage.getItem('authToken'); // Recupera il token di autenticazione

    fetch('http://localhost:8080/doctor/image', { // URL corretto
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` // Header per l'autenticazione
        },
        body: formData // Invia il file tramite FormData
    })
    .then(response => {
        console.log('Stato risposta:', response.status);
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('File caricato con successo:', data);
        alert('Immagine caricata correttamente!');

        // Aggiorna l'anteprima dell'immagine caricata
        const imgPreview = document.getElementById('photo');
        if (imgPreview) {
            imgPreview.src = `data:image/png;base64,${data.data}`; // Mostra l'immagine caricata
        }
    })
    .catch(error => {
        console.error('Errore durante il caricamento del file:', error);
        alert(`Errore durante il caricamento del file: ${error.message}`);
    });
});




  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
  
    // Effettua la richiesta fetch per ottenere i dettagli
    fetch('http://localhost:8080/user/details', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Richiesta avvenuta con successo");
  
            // Popolamento dei campi direttamente tramite ID
            document.getElementById('nome').value = data.user.nome || '';
            document.getElementById('cognome').value = data.user.cognome || '';
            document.getElementById('email').value = data.user.email || '';
            document.getElementById('studioMedico').value = data.doctor?.studioMedico?.nome || '';

            // Aggiorna il nome completo sul campo h4
            const nomeCompletoElement = document.getElementById('nomeCompleto');
            if (nomeCompletoElement) {
                nomeCompletoElement.textContent = `${data.user.nome} ${data.user.cognome}`;
            }

            // Imposta la prima specializzazione sul <p>
            const specializzazioneElement = document.getElementById('specializzazione');
            if (specializzazioneElement) {
                specializzazioneElement.textContent = data.doctor?.specializzazioni?.[0]?.nome || 'Nessuna specializzazione';
            }

            // Aggiorna la bio con la descrizione
            const bioElement = document.getElementById('bio');
            if (bioElement) {
                bioElement.textContent = data.doctor?.descrizione || 'Descrizione non disponibile';
            }

            // Aggiorna l'indirizzo con il valore di "residenza"
            const indirizzoElement = document.getElementById('indirizzo');
            if (indirizzoElement) {
                indirizzoElement.textContent = data.doctor?.residenza || 'Indirizzo non disponibile';
            }

            // Gestione della select "Specializzazioni"
            const selectElement = document.getElementById('spec');
            if (selectElement && data.doctor?.specializzazioni?.length) {
                // Cancella eventuali opzioni esistenti
                selectElement.innerHTML = '<option selected></option>';

                // Aggiungi le opzioni delle specializzazioni
                data.doctor.specializzazioni.forEach(spec => {
                    const option = document.createElement('option');
                    option.value = spec.specializationId;
                    option.textContent = spec.nome;
                    selectElement.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Errore durante la chiamata fetch:', error);
        });
});




  document.addEventListener('DOMContentLoaded', () => {
    const photoElement = document.getElementById('photo'); 
    const defaultImage = 'img/110d9628bc5cd4bea05ec1464cd911eb.jpg';
    const token = localStorage.getItem('authToken');

    fetch('http://localhost:8080/doctor/image', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      }
  })
      .then(response => response.json())
      .then(data => {
          const base64Data = data.fileData; // Recupera il file Base64
          const mimeType = "image/png"; // Cambia il MIME type se diverso
          photoElement.src = `data:${mimeType};base64,${base64Data}`;
      })
      .catch(error => {
          console.error('Errore:', error);
          photoElement.src = defaultImage; // Usa immagine di default
      });
  
});

  // Seleziona gli elementi
  const passwordField = document.getElementById("passwordField");
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeSlashIcon = document.getElementById("eyeSlashIcon");
  const editIcon = document.getElementById("editIcon");

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

  document.getElementById('saveChanges').addEventListener('click', () => {
    const token = localStorage.getItem('authToken'); // Recupera il token di autenticazione
  
    if (!token) {
      console.error("Token non trovato. Effettua il login prima di procedere.");
      alert("Errore: token non trovato. Effettua il login.");
      return;
    }
  
    console.log("Bottone 'Modifica' cliccato.");
  
    // Recupera le opzioni selezionate
    const specializzazioni = Array.from(document.getElementById('spec').options)
      .filter(option => option.selected) // Prendi solo le opzioni selezionate
      .map(option => option.value.trim()) // Recupera il valore di ogni opzione
      .filter(value => value !== ''); // Escludi eventuali valori vuoti
  
    // Crea l'oggetto con i dettagli aggiornati
    const updatedDetails = {
      nome: document.getElementById('nome')?.value || null,
      cognome: document.getElementById('cognome')?.value || null,
      descrizione: document.getElementById('bio')?.textContent || null,
      residenza: document.getElementById('indirizzo')?.textContent || null,
      specializzazioni,
    };
  
    // Rimuove i campi con valore null
    const cleanedDetails = Object.fromEntries(
      Object.entries(updatedDetails).filter(([_, value]) => value !== null)
    );
  
    console.log('Dettagli aggiornati da inviare:', cleanedDetails);
  
    // Effettua la richiesta PUT per aggiornare i dettagli
    fetch('http://localhost:8080/user/details', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanedDetails), // Invia i dettagli senza campi null
    })
      .then(response => {
        console.log(`Stato della risposta: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Dettagli aggiornati con successo:', data);
        alert('Dettagli aggiornati correttamente!');
      })
      .catch(error => {
        console.error('Errore durante la chiamata PUT:', error);
        alert("Errore durante l'aggiornamento. Controlla la console per maggiori dettagli.");
      });
  });
  
  
  
  
  
  

  

  