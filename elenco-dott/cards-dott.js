
/*const searchInput = document.getElementById('dott');
const cards = document.querySelectorAll('.card');

// Nascondi tutte le cards all'inizio
cards.forEach(card => {
  card.style.display = 'none';
});

searchInput.addEventListener('keyup', function(event) {
  const cerca = searchInput.value.toLowerCase();

  // Mostra tutte le cards se la barra di ricerca è vuota
  if (cerca === '' || cerca===this.defaultValue) {
    cards.forEach(card => {
      card.style.display = 'block';
    });
    return;
  }

  cards.forEach(card => {
    const cardTitle = card.dataset.title.toLowerCase();
    if (cardTitle.includes(cerca)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  if (event.key === 'Enter') {
    // Qui puoi aggiungere del codice da eseguire quando l'utente preme Invio
    console.log('Ricerca effettuata:', searchTerm);
  }
});
*/
// Example starter JavaScript for disabling form submissions if there are invalid fields
const nome = document.getElementById("nome");

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
nome.addEventListener("input", function(event){
  nome.setCustomValidity('');
});