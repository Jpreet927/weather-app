import { updateWeather } from "./dom"
import { OPENWEATHER_API } from "./config"

async function fetchCurrentWeather(city = "Toronto") {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${OPENWEATHER_API}`);
    const weatherData = await response.json();

    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    const location = weatherData.name;

    fetchCompleteWeather(longitude, latitude, location);
};

async function fetchCompleteWeather(long, lat, location) {
    const exclude = "minutely,alerts"
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${OPENWEATHER_API}`);
    const completeData = await response.json();

    const currentWeather = completeData.current;
    const dailyWeather = completeData.daily;
    const hourlyWeather = completeData.hourly;

    updateWeather(currentWeather, dailyWeather, hourlyWeather, location);
}

export { fetchCurrentWeather, fetchCompleteWeather }