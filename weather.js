const weather = document.querySelector(".js-wether");

const COORDS = 'coords';
const API_KEY = '48d55da6444ce08499d5ea0803283640';
//https://home.openweathermap.org/api_keys - api site

function getWether(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
       return response.json();
    })
    .then(function(json) {
        const  temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWether(latitude,longitude);
}

function handleGeoError(){
    console.log("지오에 접근 불가");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCords);
        getWether(parseCoords.latitude, parseCoords.longitude);
    }

}



function init(){
    loadCoords();

}

init();