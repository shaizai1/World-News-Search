// // let mainElement = document.querySelector('#main')
// // let dropdownElement = document.querySelector('#country-dropdown')
// // let newsElement = document.querySelector('#news')


// const fetchCountryData = (e, option) => {
//     e.preventDefault()

//     let countryName = option
//     let queryURL = `https://restcountries.com/v3.1/name/${countryName}`

//     fetch(queryURL)
//      .then(response => response.json())
//      .then(countryInfo => {
//         console.log('country-data: ', countryInfo)
//      })
// }

// const fetchNewsData = (e, option) => {
//     e.preventDefault()

//     let countryName = option
//     let apiKey = "4c7d29a7e0c153fbe2f4224825bcec4a"
//     let newsApi = `https://gnews.io/api/v4/search?q=${countryName}&apikey=${apiKey}`

//     fetch(newsApi)
//      .then(response => response.json())
//      .then(countryNews => {
//         console.log('country-news: ', countryNews)
//      })

// }


// function generateCountryInfo(e, country) {
//     e.preventDefault()
//     // fetchCountryData(e, country)
//     let countryCode = country[0].cca2
//     console.log(countryCode)
//     // console.log(country)
//     let flagURL = country[0].flags.svg;
//     console.log(flagURL)
//     let flagAlt = country[0].flags.alt;
//     document.getElementById("flags").setAttribute("src", flagURL);
//     document.getElementById("flags").setAttribute("style","max-width: 300px");
//     document.getElementById("flags").setAttribute("alt",flagAlt)

//     let name = country[0].name.common;
//     document.getElementById("titleCountry").textContent = name;

//     // Variables for main Information
//     let capital = country[0].capital[0];
//     let continent = country[0].region;
//     let currency = country[0].currencies;
//     let languages = country[0].languages;

//     // Breakdown of currency
//     var currencyCode = Object.keys(currency).toString();
//     var currencyCodeLength = currencyCode.length;

//     if(currencyCodeLength <= 3){
//         var currencyName = country[0].currencies[currencyCode].name;
//         var currencySymbol = country[0].currencies[currencyCode].symbol;
//     }
//     else if(currencyCodeLength > 3){
//         var currencyCode = currencyCode.substring(0,3);
//         var currencyName = country[0].currencies[currencyCode].name;
//         var currencySymbol = country[0].currencies[currencyCode].symbol;
//     }

//     // Breakdown to access all languages
//     var trial = Object.keys(languages);
//     var languageList = [];

//     for(i=0;i<trial.length;i++){
//         var languageName = country[0].languages[trial[i]]
//         languageList.push(languageName);
//     }

//     var finalList = languageList.join(', ')

//     // Setting text for Info Section
//     document.getElementById("textCountry").innerHTML = `
//     <li><span class="infoClasses">Capital City:</span> ${capital}</li>
//     <li><span class="infoClasses">Continent:</span> ${continent}</li>
//     <li><span class="infoClasses">Currency:</span> ${currencyName} (${currencySymbol}, ${currencyCode})</li>
//     <li><span class="infoClasses">Official Languages:</span> ${finalList}</li>`;


//     // Getting map link from API
//     var mapLink = `https://maps.google.com/maps?q=${countryName}&output=embed`;
//     document.getElementById("modalMapElement").setAttribute("src", mapLink);

//     // Modal Info
//     var modalHeading = `Map of ${name}`;
//     document.getElementById("modalHeader").textContent = modalHeading;
// }

// mainElement.addEventListener('change', (e) => {


//     if(e.target.id === "country-dropdown") {
//       const option = e.target.value
//       fetchCountryData(e, option)
//       fetchNewsData(e, option)
//       generateCountryInfo(e, option)
//     }
//   })