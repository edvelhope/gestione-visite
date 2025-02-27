let list = document.querySelectorAll('.navigation li');

function activeLink() {
    list.forEach(item =>{
        item.classList.remove("hovered");

    });
    this.classList.add("hovered");
}

list.forEach(item => item.addEventListener("mouseover", activeLink));

document.addEventListener("DOMContentLoaded", function () {
    // Prendi tutti gli <li> nel menu
    let menuItems = document.querySelectorAll(".navigation li");

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // Evita il comportamento di default del link

            let target = this.getAttribute("data-target"); // Ottieni il target del clic

            // Nasconde tutti i contenuti
            document.querySelectorAll(".content").forEach(content => {
                content.style.display = "none";
            });

            // Mostra il contenuto corrispondente
            document.getElementById(target).style.display = "block";
        });
    });
});