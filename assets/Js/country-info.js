var countryName = ""

if(countryName == ""){
    document.getElementById("countryInfoText").innerHTML = "";
    document.getElementById("countryInfoText").innerHTML = `
    <p>Please Select a Country</p>`;
    document.getElementById("countryInfoText").setAttribute("class","d-flex align-items-center justify-content-center");
    document.getElementById("countryInfoText").setAttribute("style","height: 200px");
}