let list = document.querySelectorAll('.navigation li');

function activeLink() {
    list.forEach(item =>{
        item.classList.remove("hovered");

    });
    this.classList.add("hovered");
}

list.forEach(item => item.addEventListener("mouseover", activeLink));






document.addEventListener("DOMContentLoaded", function () {
    
    let menuItems = document.querySelectorAll(".navigation li");

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            let target = this.getAttribute("data-target"); 

            
            document.querySelectorAll(".content").forEach(content => {
                content.style.display = "none";
            });

            
            document.getElementById(target).style.display = "block";
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    let menuItems = document.querySelectorAll(".navigation li");
    let contents = document.querySelectorAll(".content");

   
    if (menuItems.length > 0) {
        menuItems[0].classList.add("active");
        let defaultTarget = menuItems[0].getAttribute("data-target");
        document.getElementById(defaultTarget).style.display = "block"; 
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

          
            menuItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active"); 

            let target = this.getAttribute("data-target");

         
            contents.forEach(content => content.style.display = "none");

        
            document.getElementById(target).style.display = "block";
        });
    });


    /*grafico */
    const ctx = document.getElementById('myDoughnutChart').getContext('2d');
    const data = {
      labels: [
        'Iscritti',
        'Prenotati',
        'Medici'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',  // Rosso
          'rgb(54, 162, 235)',  // Blu
          'rgb(255, 205, 86)'   // Giallo
        ],
        hoverOffset: 4
      }]
    };
  
    const config = {
      type: 'doughnut',  // Tipo di grafico: ciambella
      data: data,
      options: {
        responsive: true, 
        cutout: '40%', // Il grafico è reattivo
        plugins: {
          legend: {
            position: 'top',  // Posizione della legenda
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw; // Mostra la percentuale nei tooltip
              }
            }
          }
        }
      }
    };  
    // Crea il grafico
    const myDoughnutChart = new Chart(ctx, config);

    

    
});


