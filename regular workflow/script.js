const API_KEY = "495c3ff348c83bce1d05cf49bb674544";

async function fetchCurrentWeather(city = "Toronto") {
    
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
    const weatherData = await response.json();

    console.log(weatherData);
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    const location = weatherData.name;
    fetchCompleteWeather(longitude, latitude, location);
};

async function fetchCompleteWeather(long, lat, location) {
    const exclude = "minutely,alerts"
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${API_KEY}`);
    const completeData = await response.json();

    const currentWeater = completeData.current;
    const dailyWeather = completeData.daily;
    const hourlyWeather = completeData.hourly;
    console.log(completeData);
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

function rednerHourlyWeather(hourly) {
    let container = document.querySelector(".weather-hourly-container");
    let hourlyContainer = document.createElement("div");
    let icon = document.createElement("img");
    let temperature = document.createElement("h1");
    let time = document.createElement("p");

    icon.src = "" // function to determine icon
    temperature.textContent = hourly.temp;
    time.textContent = "" // function to convert time from UNIX
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

function updateWeather(current, daily, hourly, city) {
    renderCurrentWeather(current, city);
    renderDailyWeather(daily);
    rednerHourlyWeather(hourly);
}

function farenheitToCelsius(temp) {
    celsiusTemp = (temp - 32) * 5 / 9;
    return celsiusTemp
}

function kelvinToCelsius(temp) {
    celsiusTemp = temp - 273;
    return celsiusTemp
}

document.querySelector(".unit-toggle-container").addEventListener('click', () => {
    document.querySelector(".unit-toggle-container").classList.toggle("active");
})