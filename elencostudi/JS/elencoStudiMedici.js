document.addEventListener("DOMContentLoaded", function () {
    fetchMedicalOffices();
  });

  function fetchMedicalOffices() {
    fetch("http://localhost:8080/medicaloffice/all") // Cambia URL se necessario
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nel recupero degli studi medici");
            }
            return response.json();
        })
        .then(data => {
            displayMedicalOffices(data);
        })
        .catch(error => console.error("Errore:", error));
  }

  function displayMedicalOffices(offices) {
    let container = document.getElementById("studiosList");
    container.innerHTML = ""; // Puliamo la lista prima di riempirla

    offices.forEach(office => {
        let imageSrc = null; // Immagine predefinita
        console.log("% " + office.nome);

        if (office.nome === "Salute e Benessere ") {
            imageSrc = "../img/Salute e benessere.png";
        } else if (office.nome === "Life Care") {
            imageSrc = "../img/LifeCare.png";
        } else if (office.nome === "Studio Medico del Sorriso") {
            imageSrc = "../img/StudioMedico.jpeg";
        }

        // Dividiamo le specializzazioni in base alla virgola o altro separatore
        let specializzazioni = office.specializzazione
            ? office.specializzazione.split(" e ").map(s => s.trim())
            : ["Generale"];

        let specializzazioniHtml = specializzazioni.map((spec, index) =>
            `<li class="list-group-item"> ${index + 1}:${spec}</li>`).join("");

        let card = `
            <div class="col study-card" data-name="${office.nome}">
                <div class="card h-100">
                    <img src="${imageSrc}" class="card-img-top" alt="${office.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${office.nome}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        ${specializzazioniHtml}
                        <li class="list-group-item">
                            <button class="btn btn-primary" onclick="goToDoctorsPage('${office.nome}')">Vedi Dottori</button>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
  }



  // Funzione per filtrare le card (rimane invariata)
  function filterStudies() {
    let input = document.getElementById("filterInput");
    let filter = input.value.toLowerCase();
    let cards = document.querySelectorAll(".study-card");

    cards.forEach(function(card) {
        let studioName = card.getAttribute("data-name").toLowerCase();
        card.style.display = studioName.includes(filter) ? "block" : "none";
    });

  }
