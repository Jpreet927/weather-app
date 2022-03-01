import { farenheitToCelsius, 
         celsiusToFarenheit, 
         kelvinToCelsius, 
         determineIcon, 
         determineBackground } from './helpers'

function renderPage(current, city) {
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

    container.classList.add("container");
    headerTitle.classList.add("header-title");
    cityForm.id = "city-form";
    citySearchContainer.classList.add("city-search-container");
    citySearchInput.id = "city-search";
    weatherInfoBody.classList.add("weather-info");
    weatherInfoContainer.classList.add("weather-info-container");
    weatherInfoTop.classList.add("weather-top");
    weatherInfoBottom.classList.add("weather-bottom");

    container.style.backgroundImage = determineBackground();
    headerTitle.textContent = "Weather App";
    citySearchInput.type = "text";
    citySearchIcon.src = "../images/Icons/search.png";

    citySearchContainer.append(citySearchInput, citySearchIcon);
    cityForm.append(citySearchContainer);
    header.append(headerTitle, cityForm);
    weatherInfoContainer.append(weatherInfoTop, weatherInfoBottom);
    weatherInfoBody.append(weatherInfoContainer);
    container.append(header, weatherInfoBody);

    cityForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let city = citySearchInput.value.trim();
        if (city) {
            fetchCurrentWeather(city);
            cityInput.value = "";
        }
    });
}

function renderCurrentWeather(current, city) {
    let container = document.querySelector(".weather-top");
    let currentContainer = document.createElement("div");
    let location = document.createElement("p");
    let icon = document.createElement("img");
    let currentTemperature = document.createElement("h1");
    let infoContainer = document.createElement("div");
    let feelsLikeTemp = document.createElement("p");
    let humidity = document.createElement("p");
    let pressure = document.createElement("p");

    location.textContent = city;
    currentTemperature.textContent = current.temp; // function to convert to C
    feelsLikeTemp.textContent = current.feels_like; // function to convert to C
    humidity.textContent = `${current.humidity} %`;
    pressure.textContent = `${current.pressure} mb`;
    icon.src = "" // function to determine icon

    currentContainer.classList.add("weather-today-container");
    location.classList.add("city");
    currentTemperature.classList.add("current-temperature");
    infoContainer.classList.add("other-info");

    infoContainer.append(feelsLikeTemp, humidity, pressure);
    currentContainer.append(location, icon, currentTemperature, infoContainer);
    container.append(currentContainer);
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

    day.textContent = "" // convert unix to day/time
    temperature.textContent = daily.temp.day;
    dailyHigh.textContent = daily.temp.max;
    dailyLow.textContent = daily.temp.min;
    icon.src = "" // function to determine icon

    dailyContainer.classList.add("weather-daily");
    day.classList.add("day-of-week");
    temperature.classList.add("daily-temperature");
    tempRangeContainer.classList.add("daily-range");
    dailyHigh.classList.add("daily-high");
    dailyLow.classList.add("daily-low");

    tempRangeContainer.append(dailyHigh, dailyLow);
    dailyContainer.append(day, icon, temperature, tempRangeContainer);
    container.append(dailyContainer);
    // renders single card, called in loop
}

function renderHourlyWeather(hourly) {
    let container = document.querySelector(".weather-hourly-container");
    let hourlyContainer = document.createElement("div");
    let icon = document.createElement("img");
    let temperature = document.createElement("h1");
    let time = document.createElement("p");

    icon.src = "" // function to determine icon
    temperature.textContent = hourly.temp;
    time.textContent = "" // function to convert time from UNIX
}

function updateWeather(current, daily, hourly, city) {
    renderCurrentWeather(current, city);
    renderDailyWeather(daily);
    rednerHourlyWeather(hourly);
}