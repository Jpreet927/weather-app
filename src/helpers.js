function farenheitToCelsius(temp) {
    celsiusTemp = (temp - 32) * 5 / 9;
    return celsiusTemp
}

function celsiusToFarenheit(temp) {
    farenheitTemp = (temp * 9 / 5) + 32;
    return farenheitTemp
}

function kelvinToCelsius(temp) {
    celsiusTemp = temp - 273.15;
    return celsiusTemp
}

function convertTime(unixTime) {
    let daysOfWeek = ["Sunday",
                      "Monday", 
                      "Tuesday", 
                      "Wednesday", 
                      "Thursday", 
                      "Friday", 
                      "Saturday"];

    let date = new Date(unixTime * 1000);
    let day = daysOfWeek[date.getDay()];
    let hour = formatTime(date.getHours());

    return [day, hour]
}

function formatTime(hour) {
    let abbrev;
    let newHour;

    if (parseInt(hour) > 12) {
        newHour = parseInt(hour) - 12;
        abbrev = "PM";
    } else {
        abbrev = "AM";
    }

    formattedHour = `${newHour}:00 ${abbrev}`;
    return formattedHour
}

function determineIcon(weatherCondition, time) {
    timeHour = convertTime(time)[1];

    if (timeHour > 20 || timeHour < 6) {
        return "../images/Icons/night.png"
    } else if (weatherCondition === "Snow") {
        return "../images/Icons/snow.png"
    } else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") {
        return "../images/Icons/rain.png"
    } else if (weatherCondition === "Clouds") {
        return "../images/Icons/clouds.png"
    } else if (weatherCondition === "Thuderstorm") {
        return "../images/Icons/thunderstorm.png"
    } else if (weatherCondition === "Clear") {
        return "../images/Icons/sun.png"
    } else {
        return "../images/Icons/sun.png"
    }
}

function determineBackground(weatherCondition, time, sunrise, sunset) {
    sunriseHour = convertTime(sunrise)[1];
    sunsetHour = convertTime(sunset)[1];
    timeHour = convertTime(time)[1];

    if (weatherCondition === "Snow" && (timeHour > sunsetHour || timeHour < sunriseHour)) {
        return "../images/snownight.jpeg"
    } else if (weatherCondition === "Snow" && timeHour > sunriseHour && timeHour < sunsetHour) {
        return "../images/snow.jpg"
        // day snow
    } else if ((weatherCondition === "Rain" || weatherCondition === "Drizzle") && (timeHour > sunsetHour || timeHour < sunriseHour)) {
        return "../images/rainnight.jpeg"
        // night rain 
    } else if ((weatherCondition === "Rain" || weatherCondition === "Drizzle") && timeHour > sunriseHour && timeHour < sunsetHour) {
        // day rain
        return "../images/rain.jpg"
    } else if (weatherCondition === "Clouds" && (timeHour > sunsetHour || timeHour < sunriseHour)) {
        // night clouds
        return "../images/night.png"
    } else if (weatherCondition === "Clouds" && timeHour > sunriseHour && timeHour < sunsetHour) {
        // day clouds
        return "../images/cloudy2.jpg"
    } else if (weatherCondition === "Clear" && (timeHour > sunsetHour || timeHour < sunriseHour)) {
        // night 
        return "../images/night.jpg"
    } else if (weatherCondition === "Clear" && timeHour > sunriseHour && timeHour < 8) {
        // sunrise
        return "../images/sunrise.jpg"
    } else if (weatherCondition === "Clear" && timeHour > 8 && timeHour < 6) {
        // day time
        return "../images/sunny.jpg"
    } else if (weatherCondition === "Clear" && timeHour > 6 && timeHour < sunsetHour) {
        // sunset
        return "../images/sunset.jpg"
    } else if (weatherCondition === "Thunderstorm") {
        // thunderstorm
        return "../images/thunderstorm.jpg"
    } else {
        return "../images/cloudy2.jpg"
    }
}

export { 
         farenheitToCelsius, 
         celsiusToFarenheit, 
         kelvinToCelsius, 
         convertTime,
         determineIcon, 
         determineBackground 
       }