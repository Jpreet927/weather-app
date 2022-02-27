const API_KEY = "495c3ff348c83bce1d05cf49bb674544";

async function fetchCurrentWeather(city = "Toronto") {
    
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
    const weatherData = await response.json();

    
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    fetchCompleteWeather(longitude, latitude);
};

async function fetchCompleteWeather(long, lat) {
    const exclude = "minutely,alerts"
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${API_KEY}`);
    const completeData = await response.json();

    
    console.log(completeData);
}

fetchCurrentWeather();

// search bar
let citySearchForm = document.getElementById("city-form");

citySearchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityInput = document.getElementById("city-search");
    let city = cityInput.value.trim();

    if (city) {
        fetchCurrentWeather(city);
        cityInput.value = "";
    }
});

function updateWeather() {
    // update cards on screen
}

function farenheitToCelsius(temp) {
    celsiusTemp = (temp - 32) * 5 / 9;
    return celsiusTemp
}

function kelvinToCelsius(temp) {
    celsiusTemp = temp - 273;
    return celsiusTemp
}