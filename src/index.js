function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed"); 
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    

iconElement.innerHTML = `<img
    src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    }

function formatDate(date){
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
    let apiKey = "b9d4b0f1302d1ta5ba14cob9718ff6e7";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function displayForecast() {
   
    let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml =
            forecastHtml + 
        `
        <div class="weather-forecast-day">
                  <div class="weather-forecast-date">${day}</div>
                  <div class="weather-forecast-icon">⛅</div>
                  <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature"><strong>6°C</strong></div>
                    <div class="weather-forecast-temperature">-1°C</div>  
                  </div>
                </div> 
                `;
    });
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;  
}
   

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Amsterdam");
displayForecast();
