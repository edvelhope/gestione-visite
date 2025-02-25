function login(email, password) {
  fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //il corpo della richiesta sarà in formato JSON
    },
    body: JSON.stringify({ email, password }), //I dati (email e password) vengono convertiti in una stringa JSON con JSON.stringify()
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login fallito");
      }
      document.getElementById("password").style.borderColor = "red";
      return response.json();
    })
    .then((data) => {
      console.log("Login effettuato:", data);
      //Salva il token nel localStorage, dove i dati sono disponibili anche alla chiusura del browser, in modo persistente e senza scadenza sul client
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      // Salva il ruolo se presente
      if (data.role) {
        localStorage.setItem("userRole", data.role);
      }

      window.alert("Login effettuato.");
      location.replace("../homepage/homepage.html");
    })
    .catch((error) => {
      document.getElementById("password").style.borderColor = "red";
      document.getElementById("password").style.color = "red";
      const lbPassword = document.getElementById("lbPassword");
      if (lbPassword) {
        lbPassword.innerText = "Password errata!";
      }
      console.error("Errore nel login:", error);
      window.alert("Login errato.");
    });
}

document
  .getElementById("formLogin")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(username, password);
  });
