
// controlli sulla barra di ricerca
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

const card = document.getElementsByClassName("card");
function funzione (){

}