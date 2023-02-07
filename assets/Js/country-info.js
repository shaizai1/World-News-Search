var countryName = ""

if(countryName == ""){
    document.getElementById("countryInfoText").innerHTML = "";
    document.getElementById("countryInfoText").innerHTML = `
    <p>Please Select a Country</p>`;
    document.getElementById("countryInfoText").setAttribute("class","d-flex align-items-center justify-content-center");
    document.getElementById("countryInfoText").setAttribute("style","height: 200px");
}
else{
    var queryURL = `https://restcountries.com/v3.1/name/${countryName}`


    fetch(queryURL)
    .then(response => response.json())
    .then(function(country){

        console.log(country)
    
        var flagURL = country[0].flags.svg;
        var flagAlt = country[0].flags.alt;
        document.getElementById("flags").setAttribute("src", flagURL);
        document.getElementById("flags").setAttribute("style","max-width: 300px");
        document.getElementById("flags").setAttribute("alt",flagAlt)

        var name = country[0].name.common;
        document.getElementById("titleCountry").textContent = name;

        // Variables for main Information
        var capital = country[0].capital[0];
        var continent = country[0].region;
        var currency = country[0].currencies;
        var languages = country[0].languages;

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
        var mapLink = `https://maps.google.com/maps?q=${countryName}&output=embed`
        document.getElementById("modalMapElement").setAttribute("src", mapLink);
        
        // Modal Info
        var modalHeading = `Map of ${name}`;
        document.getElementById("modalHeader").textContent = modalHeading;
    })
}
