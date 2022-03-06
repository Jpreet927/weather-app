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
    let headerRight = document.createElement("div");
    let unitToggleContainer = document.createElement("div");
    let unitToggleButton = document.createElement("div");
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
    let hourlySection1 = document.createElement("div");
    let hourlySection2 = document.createElement("div");
    let hourlySection3 = document.createElement("div");
    let hourlySectionButtonContainer = document.createElement("div");
    let hourlySectionButton1 = document.createElement("div");
    let hourlySectionButton2 = document.createElement("div");
    let hourlySectionButton3 = document.createElement("div");

    container.classList.add("container");
    headerTitle.classList.add("header-title");
    headerRight.classList.add("header-right");
    unitToggleContainer.classList.add("unit-toggle-container");
    unitToggleButton.classList.add("unit-toggle-button");
    cityForm.id = "city-form";
    citySearchContainer.classList.add("city-search-container");
    citySearchInput.id = "city-search";
    citySearchInput.placeholder = "Search for a city!";
    weatherInfoBody.classList.add("weather-info");
    weatherInfoContainer.classList.add("weather-info-container");
    weatherInfoTop.classList.add("weather-top");
    weatherInfoBottom.classList.add("weather-bottom");
    currentWeatherContainer.classList.add("weather-today-container");
    dailyWeatherContainer.classList.add("weather-daily-container");
    hourlyWeatherContainer.classList.add("weather-hourly-container");
    hourlySection1.id = "hourly-section-1";
    hourlySection1.classList.add("hourly-section");
    hourlySection2.id = "hourly-section-2";
    hourlySection2.classList.add("hourly-section");
    hourlySection3.id = "hourly-section-3";
    hourlySection3.classList.add("hourly-section");
    hourlySectionButtonContainer.classList.add("hourly-sections-container");
    hourlySectionButton1.classList.add("hourly-section-btn", "section-selected");
    hourlySectionButton2.classList.add("hourly-section-btn");
    hourlySectionButton3.classList.add("hourly-section-btn");

    // container.style.backgroundImage = determineBackground(current.weather.main, current.dt, current.sunrise, current.sunset);
    headerTitle.textContent = "Weather App";
    citySearchInput.type = "text";
    citySearchIcon.src = "../images/Icons/search.png";
    hourlySection1.style.display = "flex";
    hourlySection2.style.display = "none";
    hourlySection3.style.display = "none";

    citySearchContainer.append(citySearchInput, citySearchIcon);
    cityForm.append(citySearchContainer);
    unitToggleContainer.append(unitToggleButton);
    headerRight.append(unitToggleContainer, cityForm);
    header.append(headerTitle, headerRight);
    hourlyWeatherContainer.append(hourlySection1, hourlySection2, hourlySection3);
    hourlySectionButtonContainer.append(hourlySectionButton1, hourlySectionButton2, hourlySectionButton3);
    weatherInfoTop.append(currentWeatherContainer, dailyWeatherContainer);
    weatherInfoBottom.append(hourlyWeatherContainer, hourlySectionButtonContainer);
    weatherInfoContainer.append(weatherInfoTop, weatherInfoBottom);
    weatherInfoBody.append(weatherInfoContainer);
    container.append(header, weatherInfoBody);
    body.append(container);

    unitToggleContainer.addEventListener('click', () => {
        unitToggleContainer.classList.toggle("active");
        updateTemperatureUnits();
    })

    hourlySectionButton1.addEventListener('click', (e) => {
        hourlySectionButton1.classList.add("section-selected");
        hourlySection1.style.display = "flex";
        hourlySection2.style.display = "none";
        hourlySection3.style.display = "none";

        if (hourlySectionButton2.classList.contains("section-selected")) {
            hourlySectionButton2.classList.remove("section-selected");
        }

        if (hourlySectionButton3.classList.contains("section-selected")) {
            hourlySectionButton3.classList.remove("section-selected");
        }
    });

    hourlySectionButton2.addEventListener('click', (e) => {
        hourlySectionButton2.classList.add("section-selected");
        hourlySection2.style.display = "flex";
        hourlySection1.style.display = "none";
        hourlySection3.style.display = "none";

        if (hourlySectionButton1.classList.contains("section-selected")) {
            hourlySectionButton1.classList.remove("section-selected");
        }

        if (hourlySectionButton3.classList.contains("section-selected")) {
            hourlySectionButton3.classList.remove("section-selected");
        }
    });

    hourlySectionButton3.addEventListener('click', (e) => {
        hourlySectionButton3.classList.add("section-selected");
        hourlySection3.style.display = "flex";
        hourlySection1.style.display = "none";
        hourlySection2.style.display = "none";

        if (hourlySectionButton1.classList.contains("section-selected")) {
            hourlySectionButton1.classList.remove("section-selected");
        }

        if (hourlySectionButton2.classList.contains("section-selected")) {
            hourlySectionButton2.classList.remove("section-selected");
        }
    });

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
    currentTemperature.textContent = `${Math.round(kelvinToCelsius(current.temp))} °C`; // function to convert to C
    feelsLikeTemp.textContent = `Feels Like: ${Math.round(kelvinToCelsius(current.feels_like))} °C`; // function to convert to C
    humidity.textContent = `Humidity: ${current.humidity} %`;
    pressure.textContent = `Pressure: ${current.pressure} mb`;
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
    temperature.textContent = `${Math.round(kelvinToCelsius(daily.temp.day))} °C`;
    dailyHigh.textContent = `High: ${Math.round(kelvinToCelsius(daily.temp.max))} °C`;
    dailyLow.textContent = `Low: ${Math.round(kelvinToCelsius(daily.temp.min))} °C`;
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

function renderHourlyWeather(hourly, section) {
    let container = document.querySelector(".weather-hourly-container");
    let sectionContainer = document.getElementById(`hourly-section-${section}`);
    let hourlyContainer = document.createElement("div");
    let icon = document.createElement("img");
    let temperature = document.createElement("h1");
    let time = document.createElement("p");

    icon.src = determineIcon(hourly.weather[0].main, hourly.dt)
    temperature.textContent = `${Math.round(kelvinToCelsius(hourly.temp))} °C`;
    time.textContent = convertTime(hourly.dt).formattedTime;

    hourlyContainer.classList.add("weather-hourly");
    temperature.classList.add("hourly-temperature");
    time.classList.add("hourly-time");
    hourlyContainer.append(icon, temperature, time);
    sectionContainer.append(hourlyContainer);
}

function updateBackground(current) {
    let background = document.querySelector(".container");
    console.log(current);
    background.style.backgroundImage = `url(${determineBackground(current.weather[0].main, current.dt, current.sunrise, current.sunset)})`;
}

function updateWeather(current, dailyArr, hourlyArr, city) {
    let currentContainer = document.querySelector(".weather-today-container");
    let dailyContainer = document.querySelector(".weather-daily-container");
    let hourlySectionContainers = document.querySelectorAll(".hourly-section");

    currentContainer.innerHTML = "";
    dailyContainer.innerHTML = "";
    
    for (let i = 0; i < hourlySectionContainers.length; i++) {
        hourlySectionContainers[i].innerHTML = "";
    }

    updateBackground(current);
    renderCurrentWeather(current, city);

    for (let i = 0; i < 5; i++) {
        renderDailyWeather(dailyArr[i]);
    }

    for (let i = 0; i < 8; i++) {
        renderHourlyWeather(hourlyArr[i], 1);
    }

    for (let i = 8; i < 16; i++) {
        renderHourlyWeather(hourlyArr[i], 2);
    }

    for (let i = 16; i < 24; i++) {
        renderHourlyWeather(hourlyArr[i], 3);
    }
}

function updateTemperatureUnits() {
    let currTemp = document.querySelector(".current-temperature");
    let dailyTempArr = document.querySelectorAll(".daily-temperature");
    let dailyTempHigh = document.querySelectorAll(".daily-high");
    let dailyTempLow = document.querySelectorAll(".daily-low");
    let hourlyTempArr = document.querySelectorAll(".hourly-temperature");
    let unitToggle = document.querySelector(".unit-toggle-container");

    if (unitToggle.classList.contains("active")) {
        let currCelsTemp = currTemp.textContent.split(" ")[0]; 
        currTemp.textContent = `${Math.round(celsiusToFarenheit(currCelsTemp))} °F`;

        for (let i = 0; i < dailyTempArr.length; i++) {
            let dailyCelsTemp = dailyTempArr[i].textContent.split(" ")[0];
            dailyTempArr[i].textContent = `${Math.round(celsiusToFarenheit(dailyCelsTemp))} °F`;
        }

        for (let i = 0; i < dailyTempHigh.length; i++) {
            let highCelsTemp = dailyTempHigh[i].textContent.split(" ")[0];
            dailyTempHigh[i].textContent = `${Math.round(celsiusToFarenheit(highCelsTemp))} °F`;
        }

        for (let i = 0; i < dailyTempLow.length; i++) {
            let lowCelsTemp = dailyTempLow[i].textContent.split(" ")[0];
            dailyTempLow[i].textContent = `${Math.round(celsiusToFarenheit(lowCelsTemp))} °F`;
        }

        for (let i = 0; i < hourlyTempArr.length; i++) {
            let hourlyCelsTemp = hourlyTempArr[i].textContent.split(" ")[0];
            hourlyTempArr[i].textContent = `${Math.round(celsiusToFarenheit(hourlyCelsTemp))} °F`;
        }
    } else {
        let currFarTemp = currTemp.textContent.split(" ")[0]; 
        currTemp.textContent = `${Math.round(farenheitToCelsius(currFarTemp))} °C`;

        for (let i = 0; i < dailyTempArr.length; i++) {
            let dailyFarTemp = dailyTempArr[i].textContent.split(" ")[0];
            dailyTempArr[i].textContent = `${Math.round(farenheitToCelsius(dailyFarTemp))} °C`;
        }

        for (let i = 0; i < dailyTempHigh.length; i++) {
            let highFarTemp = dailyTempHigh[i].textContent.split(" ")[0];
            dailyTempHigh[i].textContent = `${Math.round(farenheitToCelsius(highFarTemp))} °C`;
        }

        for (let i = 0; i < dailyTempLow.length; i++) {
            let lowFarTemp = dailyTempLow[i].textContent.split(" ")[0];
            dailyTempLow[i].textContent = `${Math.round(farenheitToCelsius(lowFarTemp))} °C`;
        }

        for (let i = 0; i < hourlyTempArr.length; i++) {
            let hourlyFarTemp = hourlyTempArr[i].textContent.split(" ")[0];
            hourlyTempArr[i].textContent = `${Math.round(farenheitToCelsius(hourlyFarTemp))} °C`;
        }
    }
}

export { renderPage, updateWeather }