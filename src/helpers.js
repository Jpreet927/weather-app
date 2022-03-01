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
    let abbrev = "";
    if (parseInt(hour) > 12) {
        let hour = parseInt(hour) - 12;
        abbrev = "PM";
    } else {
        abbrev = "AM";
    }

    newHour = `${hour}:00 ${abbrev}`;
    return newHour
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