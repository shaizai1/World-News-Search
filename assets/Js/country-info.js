let dropdownElement = document.getElementById("country-dropdown");
let apiKey = "997e474c448436e6041e48bdcfd868fe"

let mainElement = document.querySelector('#main')
let newsElement = document.querySelector('#news')
let searchHistoryElement = document.querySelector('#search-history');

let countryContainerEl = document.getElementById("countryContainer")

let dropdown = document.querySelector(".form-select");

let search = JSON.parse(localStorage.getItem("search") || "[]");

const generateData = (e, option) => {
    // e.preventDefault()
    newsElement.innerHTML = ""
    let countryName = option

    let queryURL = `https://restcountries.com/v3.1/name/${countryName}`

    countryContainerEl.innerHTML = "";
    countryContainerEl.innerHTML = `
      <div class="col-md-4 d-flex align-items-center justify-content-center">
        <img id="flags" class="img border" src="">
      </div>
      <div id="countryInfoText" class="col-md-8 overflow-hidden">
        <div id="countryTitleHeader" class="row text-center">
          <h3 id="titleCountry"></h3>
        </div>
        <div id="countryTextBox" class="card-body text-center">
          <ul id="textCountry"></ul>
          <button id="mapButton" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal">Click to view Map</button>
        </div>
      </div>`


    fetch(queryURL)
    .then(response => response.json())
    .then(function(country){

        let flagURL = country[0].flags.svg;
        let flagAlt = country[0].flags.alt;
        document.getElementById("flags").setAttribute("src", flagURL);
        document.getElementById("flags").setAttribute("style","max-width: 300px");
        document.getElementById("flags").setAttribute("alt",flagAlt)

        let name = country[0].name.common;
        document.getElementById("titleCountry").textContent = name;

        // Variables for main Information
        let capital = country[0].capital[0]
        //console.log(capital)
        let continent = country[0].region;
        let currency = country[0].currencies;
        let languages = country[0].languages;

        // Breakdown of currency
        let currencyCode = Object.keys(currency).toString();
        let currencyCodeLength = currencyCode.length;
        let currencyName;
        let currencySymbol;

        if(currencyCodeLength <= 3){
            currencyName = country[0].currencies[currencyCode].name;
            currencySymbol = country[0].currencies[currencyCode].symbol;
        }
        else if(currencyCodeLength > 3){
            currencyCode = currencyCode.substring(0,3);
            currencyName = country[0].currencies[currencyCode].name;
            currencySymbol = country[0].currencies[currencyCode].symbol;
        }

        // Breakdown to access all languages
        var trial = Object.keys(languages);
        var languageList = [];

        for(i=0;i<trial.length;i++){
            let languageName = country[0].languages[trial[i]]
            languageList.push(languageName);
        }

        let finalList = languageList.join(', ')

        // Setting text for Info Section
        document.getElementById("textCountry").innerHTML = `
        <li><span class="infoClasses">Capital City:</span> ${capital}</li>
        <li><span class="infoClasses">Continent:</span> ${continent}</li>
        <li><span class="infoClasses">Currency:</span> ${currencyName} (${currencySymbol}, ${currencyCode})</li>
        <li><span class="infoClasses">Official Languages:</span> ${finalList}</li>`;


        // Getting map link from API
        let mapLink = `https://maps.google.com/maps?q=${countryName}&output=embed`;
        document.getElementById("modalMapElement").setAttribute("src", mapLink);

        // Modal Info
        let modalHeading = `Map of ${name}`;
        document.getElementById("modalHeader").textContent = modalHeading;
    })

    let newsApi = `https://gnews.io/api/v4/search?q=${countryName}&apikey=${apiKey}`

    fetch(newsApi)
     .then(response => response.json())
     .then(function(news){
      //console.log("news-info",news)

      const arrays = news.articles

      // creating a unique array in cases where arrays contains duplicate articles
      const map = new Map(arrays.map(item => [item.title, item]));
      const uniqueArray = [... map.values()]

      // Generating bootstrap cards for the news articles
        const newsResults =  uniqueArray.map((item) => {
          const newsHeading = item.title
          const newsUrl = item.url
          const content = item.content
          const image = item.image
          const card = document.createElement('div')
          card.innerHTML = `<div class="card news-card">
                              <img src=${image} class="card-img-top news-img" alt=${newsHeading}>
                              <div class="card-body text-center">
                                <h5 class="card-title card-header">${newsHeading}</h5>
                                <p class="card-text">${content}</p>
                                <a href=${newsUrl} class="btn btn-secondary" target="_blank">Go deeper into the story</a>
                              </div>
                            </div>`

          return card
        })

        // function in case the news api returns an empty array
         const googleSearch = () => {

           const altUrl = `https://news.google.com/search?q=${countryName}%20news&hl=en-GB&gl=GB&ceid=GB%3Aen`
            //console.log(altUrl)
            const card = document.createElement('div')
            card.innerHTML =  `<div class="card news-card">
                                <div class="card-body text-center">
                                  <h5 class="card-title"> Google News ${countryName} </h5>
                                  <p class="card-text">Google News from ${countryName}</p>
                                  <a href=${altUrl} class="btn btn-secondary" target="_blank">Click here for ${countryName} news</a>
                                </div>
                              </div>`

            return newsElement.append(card)
         }


        if (arrays.length !== 0) {

          newsResults.map((card) =>{

           newsElement.append(card)


          })
        } else {
          googleSearch()
        }
    });
}

mainElement.addEventListener('change', (e) => {
  if(e.target.id === "country-dropdown") {
    const option = e.target.value
    generateData(e, option);

    let countrySearch = e.target.value;
    //console.log(countrySearch);

    function searchDuplicate(a, arr) {
      return arr.includes(a);
    }

    if (!searchDuplicate(countrySearch, search)) {
      search.push(countrySearch)
      localStorage.setItem("search", JSON.stringify(search));
      // create search history buttons
      const historyBtn = document.createElement("button");
      historyBtn.classList.add("btn", "btn-outline-info", "history-btn", "me-2", "mb-2");
      historyBtn.textContent = countrySearch;
      historyBtn.setAttribute('data-history', countrySearch);
      searchHistoryElement.append(historyBtn);
      console.log(`hello`);
    }
  }
})
