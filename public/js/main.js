let countrySet = new Set();

window.addEventListener('DOMContentLoaded', function () {
    // DOM API
    const button = document.getElementById("button");
    const input = document.getElementById("city");
    button.onclick = handleButtonPress;
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          button.click();
        }
    });
});

async function handleButtonPress(event) {
    var city = $("#city").val();
    $("#city").val("");
    var citiesURL = "https://api.teleport.org/api/cities/?search=";
    var cityInfoURL;
    var countryInfoURL;
    if (citiesURL.includes(" ")) {
        citiesURL = citiesURL + city.replace(" ", "%20");
    } else {
        citiesURL = citiesURL + city;
    }

    const citiesResponse = await fetch(citiesURL);
    const citiesJSON = await citiesResponse.json();
    cityInfoURL = citiesJSON._embedded['city:search-results'][0]._links['city:item'].href;
    console.log(citiesJSON);
    console.log(citiesJSON._embedded['city:search-results'][0]._links['city:item'].href);

    const cityInfoResponse = await fetch(cityInfoURL);
    const cityInfoJSON = await cityInfoResponse.json();
    countryInfoURL = cityInfoJSON._links['city:country'].href;
    // console.log(cityInfoJSON.population);

    const countryInfoResponse = await fetch(countryInfoURL);
    const countryInfoJSON = await countryInfoResponse.json();
    console.log(countryInfoJSON);
    console.log(countryInfoJSON.population);
    newBlock(countryInfoJSON);
}

function newBlock(country) {
    var c = "class =\"block\"";
    var factor = country.population / 7794798739;
    var newDiv = `<div ${c} style="width:calc(100vw*${factor})">
                    <span class="vertical">
                    ${country.name}: ${country.population.toLocaleString()}
                    </span>    
                </div>`;
    const r = Math.random()*255;
    const g = Math.random()*255;
    const b = Math.random()*255;

    if (!countrySet.has(country.name)) {
        $(newDiv).hide().appendTo(".wrapper").css("border", `solid 1px rgb(${r},${g},${b})`).fadeIn("slow");
        countrySet.add(country.name);
        $("#city").attr("placeholder", "🗽Search a city...🗼");
    } else {
        $("#city").attr("placeholder", "🚫Search something else");
    }
}