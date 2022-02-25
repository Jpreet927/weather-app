//http://api.openweathermap.org/data/2.5/weather?q=London&APPID=
const dotenv = require('dotenv')

dotenv.config();

async function fetchWeather(city) {
    const API_KEY = process.env.OPENWEATHER_API;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
    const weatherData = await response.json();
    console.log(weatherData.main.temp)
}


fetchWeather("toronto")