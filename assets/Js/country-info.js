var dropdownElement = document.getElementById("country-dropdown");


dropdownElement.addEventListener('change', function(){
    var countryName = dropdownElement.value

    var queryURL = `https://restcountries.com/v3.1/name/${countryName}`


    fetch(queryURL)
    .then(response => response.json())
    .then(function(country){

        console.log(country)
    
        let flagURL = country[0].flags.svg;
        let flagAlt = country[0].flags.alt;
        document.getElementById("flags").setAttribute("src", flagURL);
        document.getElementById("flags").setAttribute("style","max-width: 300px");
        document.getElementById("flags").setAttribute("alt",flagAlt)

        let name = country[0].name.common;
        document.getElementById("titleCountry").textContent = name;

        // Variables for main Information
        let capital = country[0].capital[0];
        let continent = country[0].region;
        let currency = country[0].currencies;
        let languages = country[0].languages;

        // Breakdown of currency
        var currencyCode = Object.keys(currency).toString();
        var currencyCodeLength = currencyCode.length;

        if(currencyCodeLength <= 3){
            var currencyName = country[0].currencies[currencyCode].name;
            var currencySymbol = country[0].currencies[currencyCode].symbol;
        }
        else if(currencyCodeLength > 3){
            var currencyCode = currencyCode.substring(0,3);
            var currencyName = country[0].currencies[currencyCode].name;
            var currencySymbol = country[0].currencies[currencyCode].symbol;
        }
  
        // Breakdown to access all languages
        var trial = Object.keys(languages);
        var languageList = [];
        
        for(i=0;i<trial.length;i++){
            var languageName = country[0].languages[trial[i]]
            languageList.push(languageName);
        }

        var finalList = languageList.join(', ')

        // Setting text for Info Section
        document.getElementById("textCountry").innerHTML = `
        <li><span class="infoClasses">Capital City:</span> ${capital}</li>
        <li><span class="infoClasses">Continent:</span> ${continent}</li>
        <li><span class="infoClasses">Currency:</span> ${currencyName} (${currencySymbol}, ${currencyCode})</li>
        <li><span class="infoClasses">Official Languages:</span> ${finalList}</li>`;


        // Getting map link from API
        var mapLink = `https://maps.google.com/maps?q=${countryName}&output=embed`;
        document.getElementById("modalMapElement").setAttribute("src", mapLink);
        
        // Modal Info
        var modalHeading = `Map of ${name}`;
        document.getElementById("modalHeader").textContent = modalHeading;
    })
})

