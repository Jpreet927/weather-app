import { fetchCurrentWeather } from './apiCalls';
import { farenheitToCelsius, 
         celsiusToFarenheit, 
         kelvinToCelsius, 
         convertTime,
         determineIcon, 
         determineBackground } from './helpers'

function renderPage() {
    let body = document.querySelector("body");
    let container = document.createElement("div");
    let header = document.createElement("header");
    let headerTitle = document.createElement("h1");
    let cityForm = document.createElement("form");
    let citySearchContainer = document.createElement("div");
    let citySearchInput = document.createElement("input");
    let citySearchIcon = document.createElement("img");
    let weatherInfoBody = document.createElement("div");
    let weatherInfoContainer = document.createElement("div");
    let weatherInfoTop = document.createElement("div");
    let weatherInfoBottom = document.createElement("div");
    let currentWeatherContainer = document.createElement("div");
    let dailyWeatherContainer = document.createElement("div");
    let hourlyWeatherContainer = document.createElement("div");

    container.classList.add("container");
    headerTitle.classList.add("header-title");
    cityForm.id = "city-form";
    citySearchContainer.classList.add("city-search-container");
    citySearchInput.id = "city-search";
    weatherInfoBody.classList.add("weather-info");
    weatherInfoContainer.classList.add("weather-info-container");
    weatherInfoTop.classList.add("weather-top");
    weatherInfoBottom.classList.add("weather-bottom");
    currentWeatherContainer.classList.add("weather-today-container");
    dailyWeatherContainer.classList.add("weather-daily-container");
    hourlyWeatherContainer.classList.add("weather-hourly-container");

    // container.style.backgroundImage = determineBackground(current.weather.main, current.dt, current.sunrise, current.sunset);
    headerTitle.textContent = "Weather App";
    citySearchInput.type = "text";
    citySearchIcon.src = "../images/Icons/search.png";

    citySearchContainer.append(citySearchInput, citySearchIcon);
    cityForm.append(citySearchContainer);
    header.append(headerTitle, cityForm);
    weatherInfoTop.append(currentWeatherContainer, dailyWeatherContainer);
    weatherInfoBottom.append(hourlyWeatherContainer);
    weatherInfoContainer.append(weatherInfoTop, weatherInfoBottom);
    weatherInfoBody.append(weatherInfoContainer);
    container.append(header, weatherInfoBody);
    body.append(container);

    cityForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let city = citySearchInput.value.trim();
        if (city) {
            fetchCurrentWeather(city);
            citySearchInput.value = "";
        }
    });
}

function renderCurrentWeather(current, city) {
    let container = document.querySelector(".weather-today-container")
    let location = document.createElement("p");
    let icon = document.createElement("img");
    let currentTemperature = document.createElement("h1");
    let infoContainer = document.createElement("div");
    let feelsLikeTemp = document.createElement("p");
    let humidity = document.createElement("p");
    let pressure = document.createElement("p");

    location.textContent = city;
    currentTemperature.textContent = `${current.temp} °C`; // function to convert to C
    feelsLikeTemp.textContent = `${current.feels_like} °C`; // function to convert to C
    humidity.textContent = `${current.humidity} %`;
    pressure.textContent = `${current.pressure} mb`;
    icon.src = determineIcon(current.weather[0].main, current.dt);

    // container.classList.add("weather-today-container");
    location.classList.add("city");
    currentTemperature.classList.add("current-temperature");
    infoContainer.classList.add("other-info");

    infoContainer.append(feelsLikeTemp, humidity, pressure);
    container.append(location, icon, currentTemperature, infoContainer);
}

function renderDailyWeather(daily) {
    let container = document.querySelector(".weather-daily-container");
    let dailyContainer = document.createElement("div");
    let day = document.createElement("p");
    let icon = document.createElement("img");
    let temperature = document.createElement("h1");
    let tempRangeContainer = document.createElement("div");
    let dailyHigh = document.createElement("p");
    let dailyLow = document.createElement("p");

    day.textContent = convertTime(daily.dt).day; // convert unix to day/time
    temperature.textContent = `${daily.temp.day} °C`;
    dailyHigh.textContent = `${daily.temp.max} °C`;
    dailyLow.textContent = `${daily.temp.min} °C`;
    icon.src = determineIcon(daily.weather[0].main, daily.dt);

    dailyContainer.classList.add("weather-daily");
    day.classList.add("day-of-week");
    temperature.classList.add("daily-temperature");
    tempRangeContainer.classList.add("daily-range");
    dailyHigh.classList.add("daily-high");
    dailyLow.classList.add("daily-low");

    tempRangeContainer.append(dailyHigh, dailyLow);
    dailyContainer.append(day, icon, temperature, tempRangeContainer);
    container.append(dailyContainer);
}

function renderHourlyWeather(hourly) {
    let container = document.querySelector(".weather-hourly-container");
    let hourlyContainer = document.createElement("div");
    let icon = document.createElement("img");
    let temperature = document.createElement("h1");
    let time = document.createElement("p");

    icon.src = determineIcon(hourly.weather[0].main, hourly.dt)
    temperature.textContent = `${hourly.temp} °C`;
    time.textContent = convertTime(hourly.dt).formattedTime;

    hourlyContainer.classList.add("weather-hourly");
    temperature.classList.add("hourly-temperature");
    time.classList.add("hourly-time");
    hourlyContainer.append(icon, temperature, time);
    container.append(hourlyContainer);
}

function updateBackground(current) {
    let background = document.querySelector(".container");
    console.log(current);
    background.style.backgroundImage = `url(${determineBackground(current.weather[0].main, current.dt, current.sunrise, current.sunset)})`;
}

function updateWeather(current, dailyArr, hourlyArr, city) {
    let currentContainer = document.querySelector(".weather-today-container");
    let dailyContainer = document.querySelector(".weather-daily-container");
    let hourlyContainer = document.querySelector(".weather-hourly-container");

    currentContainer.innerHTML = "";
    dailyContainer.innerHTML = "";
    hourlyContainer.innerHTML = "";

    updateBackground(current);
    renderCurrentWeather(current, city);

    for (let i = 0; i < 5; i++) {
        renderDailyWeather(dailyArr[i]);
    }

    for (let i = 0; i < 7; i++) {
        renderHourlyWeather(hourlyArr[i]);
    }
}

export { renderPage, updateWeather }