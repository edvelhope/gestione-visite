document.addEventListener("DOMContentLoaded", function () {
  fetchServices();
});

// Funzione per recuperare le prestazioni
function fetchServices() {
  fetch("http://localhost:8080/api/services")  // URL corretto per le prestazioni
      .then(response => {
          if (!response.ok) {
              throw new Error("Errore nel recupero delle prestazioni");
          }
          return response.json();
      })
      .then(data => {
          displayServices(data);
      })
      .catch(error => console.error("Errore:", error));
}

// Funzione per visualizzare le prestazioni
function displayServices(services) {
  let container = document.getElementById("prestazioniList");
  container.innerHTML = ""; // Svuota il contenitore prima di riempirlo

  services.forEach(service => {
      let cardHTML = `
          <div class="col-12">  <!-- Colonna a tutta larghezza -->
              <div class="card h-100 shadow-sm p-3">
                  <div class="card-body">
                      <h5 class="card-title fw-bold">${service.nome} - ${service.medico}</h5>
                      <p class="card-text">${service.descrizione}</p>
                      <p class="fw-bold">Disponibilità: ${service.disponibilita}</p>
                      <button class="btn btn-primary" onclick="accettaPrestazione('${service.nome}')">Accetta Prestazione</button>
                  </div>
              </div>
          </div>
      `;
      container.innerHTML += cardHTML;
  });
}


// Funzione per accettare la prestazione
function accettaPrestazione(nomePrestazione) {
  window.location.href = `confermaPrestazione.html?prestazione=${encodeURIComponent(nomePrestazione)}`;
}
