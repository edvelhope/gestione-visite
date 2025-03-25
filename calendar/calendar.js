document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  // Creazione del calendario
  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    slotDuration: '00:30:00',    // slot di mezz'ora
    slotMinTime: '08:00:00',     // orario di inizio (8:00)
    slotMaxTime: '18:00:00',     // orario di fine (18:00)
    allDaySlot: false,           // nasconde la sezione "tutto il giorno"
    weekends: false,             // nasconde i weekend
    height: 'auto',
    locale: 'it',                // impostazioni in italiano
    editable: true,              // permette di modificare gli eventi
    selectable: true,            // permette di selezionare gli slot
    selectMirror: true,
    dayMaxEvents: true,          // permette la visualizzazione di "più" eventi
    eventClick: function (arg) {
      // Gestione clic sugli eventi
      if (arg.event.extendedProps.isReservable) {
        // Se l'evento è disponibile (verde)
        if (confirm('Vuoi prenotare questo orario?')) {
          const visita = prompt('Inserisci il nome della visita:');
          if (visita) {
            // Cambia lo stato dell'evento a "occupato"
            arg.event.setProp('title', visita); // Nome della visita
            arg.event.setProp('backgroundColor', '#dc3545'); // Rosso per occupato
            arg.event.setProp('borderColor', '#dc3545');
            arg.event.setExtendedProp('isReservable', false); // Non più prenotabile




            // Crea l'oggetto della prenotazione
            const reservation = {
              id: null, // Lascia null, sarà generato dal backend
              data: arg.event.start.toISOString().split('T')[0], // Data in formato YYYY-MM-DD
              oraInizio: arg.event.start.toISOString().split('T')[1].slice(0, 8), // Ora di inizio in formato HH:MM:SS
              oraFine: arg.event.end.toISOString().split('T')[1].slice(0, 8), // Ora di fine in formato HH:MM:SS
              stato: "Confermata", // Stato predefinito
              nomePrenotazione: visita, // Nome inserito dall'utente
              descrizione: "Prenotazione per " + visita, // Descrizione generata
              costo: 50.0, // Valore esempio, puoi sostituirlo dinamicamente
              doctor: {
                id: 1 // ID del medico, puoi sostituirlo con il valore reale
              },
              user: {
                id: 1 // ID dell'utente, puoi sostituirlo con il valore reale
              },
              payments: [] // Lascia vuoto, sarà gestito dal backend
            };
            

            // Salva l'oggetto della prenotazione nel localStorage
            localStorage.setItem('reservation', JSON.stringify(reservation));
            window.location.href = "../prenotazione/prenotazione.html";
          } else {
            alert('Prenotazione annullata. Nome della visita non inserito.');
          }
        }
      } else {
        // Slot non prenotabile
        alert('Questo slot non è prenotabile.');
      }
    }
  });

  // Fetch per ottenere e aggiornare i dati
  fetch('http://localhost:8080/availabilityhours/calendar/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Nessuna disponibilità trovata per il medico specificato e dalla data odierna.');
      }
    })
    .then(data => {
      const availabilityHours = data.availabilityHours;
      const reservations = data.reservations;

      // Aggiungi gli slot disponibili come eventi verdi
      availabilityHours.forEach(hour => {
        const startTime = `${hour.data}T${hour.oraInizio}`;
        const endTime = `${hour.data}T${hour.oraFine}`;

        // Aggiungi solo se non esiste già un evento sovrapposto
        const existingEvent = calendar.getEvents().find(event =>
          event.startStr === startTime && event.endStr === endTime
        );

        if (!existingEvent) {
          calendar.addEvent({
            title: 'Disponibile',
            start: startTime,
            end: endTime,
            backgroundColor: '#28a745', // Verde per disponibilità
            borderColor: '#28a745',
            extendedProps: {
              isReservable: true // Slot prenotabile
            }
          });
        }
      });

      // Aggiungi gli slot prenotati come eventi rossi
      reservations.forEach(res => {
        const startTime = `${res.data}T${res.oraInizio}`;
        const endTime = `${res.data}T${res.oraFine}`;

        // Aggiungi solo se non esiste già un evento sovrapposto
        const existingEvent = calendar.getEvents().find(event =>
          event.startStr === startTime && event.endStr === endTime
        );

        if (!existingEvent) {
          calendar.addEvent({
            title: 'Occupato',
            start: startTime,
            end: endTime,
            backgroundColor: '#dc3545', // Rosso per occupato
            borderColor: '#dc3545',
            extendedProps: {
              isReservable: false // Slot non prenotabile
            }
          });
        }
      });
    })
    .catch(error => {
      console.error('Errore:', error.message);
    });

  // Render del calendario
  calendar.render();
});
