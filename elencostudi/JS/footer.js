document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bottom").innerHTML = `
        <div class="container">
      <div class="row">
        <div class="col text-white p-0">
          <ul>
            <li><a href="#">I nostri Dottori</a></li>
            <li><a href="../elencostudi/html/elencoStudiMedici.html">I nostri Studi Medici</a></li>
            <li><a href="../elencostudi/html/elencoPrestazioni.html">Prestazioni Disponibili</a></li>
          </ul>
        </div>
        <div class="col text-white p-0">
          <ul>
            <li><a href="#">GDPR e informazioni relative ai pagamenti</a></li>
            <li><a href="#">Privacy e cookies</a></li>
            <li><a href="#">Preferenze cookie</a></li>
          </ul>
        </div>
        <div class="col text-white p-0">
          <ul>
            <li><a href="#">Contatti</a></li>
          </ul>
          <div class="info-contatti">
            <div class="icone">
              <i class="fas fa-mobile-alt"></i> <span>+123 456 7890</span>
            </div>
            <div class="icone">
              <i class="fas fa-envelope"></i> <span>gestione_visite@gmail.com</span>
            </div>
          </div>
        </div>
        <div class="col text-white p-0">
          <ul>
            <li><a href="#">Informazioni dell’impresa</a></li>
          </ul>
          <p>Gestione Visite Italy S.r.l. - Piazza San Nicola 3 - 00072 Ariccia (RM), Italia - Partita IVA e codice
            Fiscale 03244550863</p>
        </div>
      </div>

      <section class="social mb-4">
        <a class="btn m-1 custom-btn m-1" style="background-color: #3b5998" href="#" role="button">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a class="btn m-1 custom-btn m-1" style="background-color: #dd4b39" href="#" role="button">
          <i class="fab fa-google"></i>
        </a>
        <a class="btn m-1 custom-btn m-1" style="background-color: #ac2bac" href="#" role="button">
          <i class="fab fa-instagram"></i>
        </a>
        <a class="btn m-1 custom-btn m-1" style="background-color: #0082ca" href="#" role="button">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </section>
    </div>
    `;
});
