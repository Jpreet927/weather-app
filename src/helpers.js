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

function determineIcon(data) {

}

function determineBackground(data) {

}

export { 
         farenheitToCelsius, 
         celsiusToFarenheit, 
         kelvinToCelsius, 
         convertTime,
         determineIcon, 
         determineBackground 
       }