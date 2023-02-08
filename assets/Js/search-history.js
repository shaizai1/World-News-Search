let dropdown = document.querySelector(".form-select");

let search = json.parse(localStorage.getItem("search" || "[]"));

dropdown.addEventListener('change', function() {

    let selectedCountry = dropdown.value;
   
    localStorage.setItem("selectedCountry", JSON.stringify({selectedCountry}));
    
    JSON.parse(localStorage.getItem("selectedCountry"));
    console.log(localStorage)
     

});
