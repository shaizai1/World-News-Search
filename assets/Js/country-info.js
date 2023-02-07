var dropdownElement = document.getElementById("country-dropdown");
let apiKey = "4cdf6c2ecb724b9a939c3f53081d9566"
let mainEl = document.querySelector('#main')
let newsEl = document.querySelector('#news')


dropdownElement.addEventListener('change', function(){
    var countryName = dropdownElement.value
    var selectedCountry = dropdownElement.value

    var queryURL = `https://restcountries.com/v3.1/name/${countryName}`


    fetch(queryURL)
    .then(response => response.json())
    .then(function(country){
        let countryCode = country[0].cca2
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
        return fetch(`https://newsapi.org/v2/top-headlines/sources?country=${countryCode}&apiKey=${apiKey}`)

    })
    .then(response => response.json())
   .then(data => {
      console.log("data2",data)

      const arrays = data.sources
      console.log("arrays",arrays)

        const newsResults =  arrays.map((item) => {
          const newsHeading = item.name
          const newsUrl = item.url
          const description = item.description
          const card = document.createElement('div')
          card.innerHTML =  `<div class="news-card">
                                <h5 class="card-title">${newsHeading}</h5>
                                <a href=${newsUrl} class="card-link" target="_blank">${newsUrl} news</a>
                                <p class="card-text">${description}</p>
                              </div>`

          return card
        })

         const googleSearch = () => {

           const altUrl = `https://news.google.com/search?q=${selectedCountry}%20news&hl=en-GB&gl=GB&ceid=GB%3Aen`
            console.log(altUrl)
            const card = document.createElement('div')
            card.innerHTML =  `<div class="news-card">
                                <h5 class="card-title"> Google News ${selectedCountry} </h5>
                                <a href=${altUrl} class="card-link" target="_blank">Click here for ${selectedCountry} news</a>
                                <p class="card-text">Google News from ${selectedCountry}</p>
                              </div>`

            return newsEl.append(card)
         }

        console.log("results",newsResults)

        if (arrays.length !== 0) {

          newsResults.map((card) =>{

           newsEl.append(card)


          })
        } else {
          googleSearch()
        }
    });
})


// mainEl.addEventListener('change', (e) => {


//     if(e.target.id === "country-dropdown") {
//       const option = e.target.value
//       newsSearch(e, option)
//     }

//   })
