let apiKey = "4cdf6c2ecb724b9a939c3f53081d9566"
let mainEl = document.querySelector('#main')
let newsEl = document.querySelector('#news')




const newsSearch = (e, option) => {
  e.preventDefault();

  newsEl.innerHTML = "";

  let selectedCountry = option

  fetch (`https://restcountries.com/v3.1/name/${selectedCountry}`)
 .then(response => response.json())
 .then(data => {
   console.log("data1",data)
   let countryCode = data[0].cca2
   console.log(countryCode)

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
}

mainEl.addEventListener('change', (e) => {


  if(e.target.id === "country-dropdown") {
    const option = e.target.value
    newsSearch(e, option)
  }

})
