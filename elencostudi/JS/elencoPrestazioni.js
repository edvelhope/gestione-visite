function accettaPrestazione(nomePrestazione) {
    window.location.href = `confermaPrestazione.html?prestazione=${encodeURIComponent(nomePrestazione)}`;
  }
  