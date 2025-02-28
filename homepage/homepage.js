function getTopDoctors(id1, id2, id3) {
  const url = `http://localhost:8080/doctor/top/${id1}/${id2}/${id3}`;
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Errore nella richiesta: " + response.statusText);
        return null;
      }
    })
    .then(data => {
      console.log("Dati ricevuti:", data); // Debug dei dati ricevuti
      if (data && data.length) {
        updateDoctorCards(data); // Aggiorna i valori delle card
      } else {
        console.log("Nessun medico trovato.");
      }
    })
    .catch(error => {
      console.error("Errore di rete:", error);
    });
}

function updateDoctorCards(doctors) {
  // Seleziona e filtra solo le card valide
  const cards = Array.from(document.querySelectorAll('.card-container')).filter(card => {
    return card.querySelector('img') && card.querySelector('h2') && card.querySelector('p');
  });
  console.log("Numero di card valide trovate:", cards.length);

  // Controlla se ci sono abbastanza card rispetto al numero di medici
  if (doctors.length > cards.length) {
    console.warn("Non ci sono abbastanza card per visualizzare tutti i medici. Mostrerò i primi:", cards.length);
  }

  // Array di descrizioni generiche
  const descriptions = [
    "Un esperto in medicina generale pronto ad ascoltarti.",
    "Specialista nel campo con anni di esperienza.",
    "Dedicato a fornire cure di alta qualità per i pazienti."
  ];

  doctors.forEach((doctor, index) => {
    if (index < cards.length) { 
      const card = cards[index];
      console.log("Aggiornamento card:", card);

      // Aggiorna l'immagine
      const img = card.querySelector('img');
      if (img) {
        img.src = `data:image/png;base64,${doctor.fileData}`;
        img.alt = doctor.doctorName;
      }

      // Aggiorna il titolo
      const title = card.querySelector('h2');
      if (title) {
        title.textContent = doctor.doctorName;
      }

      // Aggiorna il testo del paragrafo con descrizioni generiche diverse
      const paragraph = card.querySelector('p');
      if (paragraph) {
        const description = descriptions[index % descriptions.length]; // Rotazione delle descrizioni
        paragraph.textContent = description;
      }
    }
  });
}

// Esegui il fetch dopo che la pagina è stata caricata
document.addEventListener('DOMContentLoaded', () => {
  console.log("Pagina caricata, eseguo la richiesta per ottenere i medici.");
  getTopDoctors(8, 9, 10);
});

document.getElementById('prenota-1').addEventListener('click', () => {
  localStorage.setItem('prenota-1', '1');
  window.location.href = "../prenotazione/prenotazione.html"; 
});

document.getElementById('prenota-2').addEventListener('click', () => {
  localStorage.setItem('prenota-2', '2');
  window.location.href = "../prenotazione/prenotazione.html";
});

document.getElementById('prenota-3').addEventListener('click', () => {
  localStorage.setItem('prenota-3', '3');
  window.location.href = "../prenotazione/prenotazione.html";
});

const searchInput = document.getElementById('search-input');
const resultsDropdown = document.getElementById('dropdown-results');

document.getElementById('button-search').addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
      resultsDropdown.style.display = 'none';
      return;
  }

  fetch(`http://localhost:8080/doctorspecialization/search/${encodeURIComponent(searchTerm)}`)
  .then(response => {
      if (response.ok) {
          // Controlla se la risposta ha contenuto
          return response.text().then(text => text ? JSON.parse(text) : []);
      } else if (response.status === 204) {
          // Gestisce il caso di nessun contenuto
          return [];
      } else {
          throw new Error('Errore durante la ricerca');
      }
  })
  .then(data => {
      resultsDropdown.innerHTML = '';

      if (data.length > 0) {
          let matchFound = false; // Indica se c'è una corrispondenza

          data.forEach(item => {
              const dropdownItem = document.createElement('div');
              dropdownItem.classList.add('dropdown-item');

              if (item.cognome && item.nome) {
                  dropdownItem.textContent = `${item.cognome} ${item.nome}`;
              } else if (item.field) {
                  dropdownItem.textContent = `Studio medico: ${item.field}`;
              } else {
                  dropdownItem.textContent = 'Risultato sconosciuto';
              }

              dropdownItem.addEventListener('click', () => {
                  searchInput.value = dropdownItem.textContent;
                  resultsDropdown.style.display = 'none';
              });

              resultsDropdown.appendChild(dropdownItem);

              let stringa = `dott. ${item.cognome} ${item.nome}`;

              if (searchTerm === `${item.cognome} ${item.nome}` || searchTerm === item.field) {
                  matchFound = true;
              }
          });

          resultsDropdown.style.display = 'block';

          if (matchFound) {
            localStorage.setItem('prenota-search', 'item');
            window.location.href = "../prenotazione/prenotazione.html";
          }
      } else {
          resultsDropdown.style.display = 'none';
      }
  })
  .catch(error => {
      console.error('Errore nella richiesta:', error);
  });

});
