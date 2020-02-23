window.addEventListener('DOMContentLoaded', function(){
    // DOM API
    const button = document.getElementById("button");
    button.onclick = handleButtonPress;
})

async function handleButtonPress(event){
    var city = document.getElementById("city").value;
    var url = "https://api.teleport.org/api/cities/?search=";
    var secondUrl;
    var thirdUrl;
    if(url.includes(" ")){
        url = url + city.replace(" ", "%20");
    }else{
        url = url + city;
    }

    const response =  await fetch(url);
    const json =  await response.json();
    secondUrl = json._embedded['city:search-results'][0]._links['city:item'].href;
    // console.log(json);
    // console.log(json._embedded['city:search-results'][0]._links['city:item'].href);
    // console.log(json._embedded['city:search-results'][0]._links['city:item'].href);
    const anotherResponse =  await fetch(secondUrl);
    const anotherJson =  await anotherResponse.json();
    // console.log(anotherJson.population);
    thirdUrl = anotherJson._links['city:country'].href;
    const otherReponse = await fetch(thirdUrl);
    const otherJson = await otherReponse.json();
    // console.log(otherJson);
    console.log(otherJson.population);
}