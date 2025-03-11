document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

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
      allDaySlot: false,           // nascondi la sezione "tutto il giorno"
      weekends: false,              // mostra anche i weekend
      height: 'auto',
      locale: 'it',                // impostazioni in italiano
      selectable: true,            // permette la selezione degli slot
      selectMirror: true,
      select: function(arg) {
        // Quando viene selezionato uno slot di tempo
        var title = prompt('Inserisci titolo per il nuovo evento:');
        if (title) {
          calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          });
        }
        calendar.unselect();
      },
      eventClick: function(arg) {
        // Quando si clicca su un evento esistente
        if (confirm('Sei sicuro di voler eliminare questo evento?')) {
          arg.event.remove();
        }
      },
      editable: true,              // permette di modificare gli eventi
      dayMaxEvents: true           // permette la visualizzazione di "più" eventi
    });

    calendar.render();
  });
