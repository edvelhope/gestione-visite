// Funzione di filtro per gli studi medici

//con let input mi recupero quello che è stato scritto all'interno della barra di filtraggio

//con let filter= trasformo il carattere in minuscolo in modo da favorire il filtro 

//con let cards  seleziono tutte le card che sono contenuto in un div con classi.study-card
function filterStudies() {
    let input = document.getElementById("filterInput");
    let filter = input.value.toLowerCase();
    let cards = document.querySelectorAll(".study-card");
  //mi faccio un foreach sulle tutte le card 
    cards.forEach(function(card) {
      //con let studioName= mi recupero il nome dello studio attraverso l attributo data-name lo trasfotmo in lettere minuscole
      let studioName = card.getAttribute("data-name").toLowerCase();
      if (studioName.includes(filter)) { //controllo studioname include quello che è stato nel filtro 
        card.style.display = "block";  //se è si mi blocco solo su quella card e faccio scomparire le altre 
      } else {//altrimenti no
        card.style.display = "none";
      }
    });
  }
  
  // Funzione per andare alla pagina dottori con filtro selezionato
 // function goToDoctorsPage(studioName) {
   // let url = `/dottori?studio=${encodeURIComponent(studioName)}`;
   // window.location.href = url;  // Redireziona alla pagina dei dottori
  //}
  