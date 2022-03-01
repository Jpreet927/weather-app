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