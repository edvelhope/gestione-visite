document.addEventListener("DOMContentLoaded", function () {
    fetch("../footer/footer.html") // Percorso del file footer.html
        .then(response => response.text())
        .then(data => {
            document.getElementById("bottom").innerHTML = data;
        })
        .catch(error => console.error("Errore nel caricamento del footer:", error));
});
