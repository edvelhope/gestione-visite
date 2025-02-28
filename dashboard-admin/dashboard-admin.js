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
});