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
  container.innerHTML = ""; // Pulisce la lista prima di riempirla

  services.forEach(service => {
    let cardHTML = `
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${service.nome} - ${service.medico}</h5>
            <p class="card-text">${service.descrizione}</p>
            <p><strong>Disponibilità:</strong> ${service.disponibilita}</p>
            <button class="btn btn-primary" onclick="accettaPrestazione('${service.nome}')">Accetta Prestazione</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

/* Funzione per filtrare le card delle prestazioni
function filterServices() {
  let input = document.getElementById("filterInput");
  let filter = input.value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    let title = card.querySelector(".card-title").textContent.toLowerCase();
    card.style.display = title.includes(filter) ? "block" : "none";
  });
}*/
function accettaPrestazione(nomePrestazione) {
  window.location.href = `confermaPrestazione.html?prestazione=${encodeURIComponent(nomePrestazione)}`;
}
