const cerca = document.getElementById('dott');

cerca.addEventListener('focus', function() {
  if (this.value === this.defaultValue) {
    this.value = '';
    this.style.color = 'black'; // Testo utente in nero
  }
});

cerca.addEventListener('blur', function() {
  if (this.value === '') {
    this.value = this.defaultValue;
    this.style.color = 'gray'; // Testo predefinito in grigio
  }
});
