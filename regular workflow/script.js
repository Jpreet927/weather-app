//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=
// import dotenv from 'dotenv'

// dotenv.config();

async function fetchWeather(city = "Toronto") {
    const API_KEY = "495c3ff348c83bce1d05cf49bb674544";
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
    const weatherData = await response.json();
    console.log(weatherData)
}


fetchWeather("toronto")