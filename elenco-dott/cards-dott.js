document.getElementById('ricerca').addEventListener('click', function() {
  let searchTerm = document.getElementById('info').value.trim();

  if (searchTerm === '') {
    alert('Inserisci un nome o un nome di ufficio!');
    return; // Interrompe l'esecuzione se il campo è vuoto
  }

  
});

const card = document.getElementsByClassName("card");
nome.addEventListener("invalid", function(event){
  if (nome.validity.valueMissing) {
    nome.setCustomValidity('Inserire un nome');
  } else if (nome.validity.typeMismatch) {
    nome.setCustomValidity('inserire un nome in formato corretto');
  } else {
    nome.setCustomValidity('');
  }
  return true;
});
function controllaSpecializzazione() {
  // Ottieni l'elemento select
  var selectSpecializzazioni = document.getElementById("specializzazioni");

  // Ottieni il valore selezionato
  var specializzazioneSelezionata = selectSpecializzazioni.value;

  // Verifica se è stata selezionata una specializzazione (il valore non è vuoto)
  if (specializzazioneSelezionata === "") {
    alert("Devi selezionare una specializzazione.");
    return false; // Impedisce l'invio del modulo
  }

  // Se è stata selezionata una specializzazione, puoi procedere
  return true; // Permette l'invio del modulo
}