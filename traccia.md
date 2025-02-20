PROGETTO n.5: Sistema di Gestione delle Prenotazioni per Studi Medici
1. Introduzione
Il progetto prevede lo sviluppo di un sistema di prenotazione online per studi medici, che consenta ai pazienti di prenotare visite, andando a scegliere il medico in base alla categoria. Il sistema sarà basato su Spring Boot per il backend, API REST per la comunicazione, Bootstrap per l'interfaccia utente e JavaScript per migliorare l'interattività.
2. Obiettivi del Progetto
Consentire ai pazienti di prenotare visite online in base alla disponibilità dei medici.
Fornire un’interfaccia chiara e intuitiva per la gestione delle prenotazioni.
Gestire l'orario di disponibilità dei medici e i turni. (Opzionale)
Integrazione con sistemi di pagamento per le visite a pagamento. (Opzionale)
3. Architettura del Sistema
3.1 Tecnologie Utilizzate
Backend: Spring Boot, Spring Security, Spring Data JPA
Database: MySQL
Frontend: Bootstrap, JavaScript (FullCalendar.js per la gestione del calendario) (Opzionale)
3.2 Modello Entity-Relationship
Utente
Medico
Studio Medico
Prenotazione
Pagamento
4. Funzionalità Principali
4.1 Gestione Utenti
Registrazione e login
Dashboard personalizzata per pazienti e medici
Possibilità di aggiornare il profilo utente
4.2 Prenotazione Visite Mediche
Visualizzazione del calendario con disponibilità dei medici (Opzionale)
Prenotazione online con selezione di medico e fascia oraria
Possibilità di annullare o modificare una prenotazione
4.3 Gestione Medici e Studi Medici
Pannello di amministrazione per la gestione degli studi medici
Definizione degli orari di disponibilità dei medici
Monitoraggio delle prenotazioni ricevute
4.4 Pagamenti Online e Fatturazione
Integrazione con Stripe/PayPal per il pagamento delle visite (Opzionale)
5. Sicurezza
Ruoli e permessi per differenziare pazienti, medici e amministratori
