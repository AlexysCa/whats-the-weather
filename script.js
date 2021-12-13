function startSite() {
    // var for js 
    var cityElement = document.getElementById("enter-city");
    var searchElement = document.getElementById("search-button");
    var nameCity = document.getElementById("city-name");
    var currentImgEl = document.getElementById("current-img");
    var currentTempEl = document.getElementById("temp");
    var currentHumidEl = document.getElementById("humid");
    var currentWindEl = document.getElementById("wind");
    var currentUvEl = document.getElementById("uv");
    var cityHistory = document.getElementById("history");
    var fiveDayEl = document.getElementById("fiveday-header");
    var currentWeatherEl = document.getElementById("current-weather");
    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// api unique key as a var
    const Key = "db51c4803ad66580db1682e7df54580f";

    function getWeather(cityName) {
        // this gets a current weather request from open weather
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + Key;
        axios.get(queryUrl)
        .then(function (response) {
            currentWeatherEl.classList.remove("d-none");

            // displays current weather details
            var currentDate = new Date(response.data.dt * 1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ")";
            var weatherImg = response.data.weather[0].icon;
            currentImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png");
            currentImgEl.setAttribute("alt", response.data.weather[0].description);
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currentHumidEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

            // uv index  
            var lat = response.data.coord.lat;
            var lon = response.data.coord.lon;
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + Key + "&cny=1";
            axios.get(uvUrl)
            .then(function (response){
                var uvIndex = document.createElement("span");

                if (response.data[0].value < 4) {
                    uvIndex.setAttribute("class", "badge badge-success");
                } else if (response.data[0].value < 8) {
                    uvIndex.setAttribute("class", "badge badge-warning");
                } else {
                    uvIndex.setAttribute("class", "badge badge-danger");
                }
                console.log(response.data[0].value)
                uvIndex.innerHTML = response.data[0].value;
                currentUvEl.innerHTML = "UV Index: ";
                currentUvEl.append(uvIndex);
            });

            // 5 day weather will go here
            var cityId = response.data.id;
            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + Key;
            axios.get(forecastUrl) 
            .then(function (response) {
                fiveDayEl.classList.remove("d-none");

            // displays 5 day future forecast
            var forecastElement = document.querySelectorAll(".forecast");
            for (i = 0; i < forecastElement.length; i++) {
                forecastElement[i].innerHTML = "";
                var forecastndex = i * 8 + 4;
                var forecastDate = new Date(response.data.list[forecastndex].dt * 1000);
                var forecastDay = forecastDate.getDate();
                var forecastMonth = forecastDate.getMonth() + 1;
                var forecastYear = forecastDate.getFullYear();
                var forecastDateEl = document.createElement("p");

                forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastElement[i].append(forecastDateEl);

            // icons for weather
            var forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastndex].weather[0].icon + "@2x.png");
            forecastWeatherEl.setAttribute("alt", response.data.list[forecastndex].weather[0].description);
            forecastElement[i].append(forecastWeatherEl);

            var forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temperature: " + k2f(response.data.list[forecastndex].main.temp) + " &#176F";
            forecastElement[i].append(forecastTempEl);

            var forecastHumidEl = document.createElement("p");
            forecastHumidEl.innerHTML = "Humidity: " + response.data.list[forecastndex].main.humidity + "%";
            forecastElement[i].append(forecastHumidEl);

            var forecastWindEl = document.createElement("p");
            forecastWindEl.innerHTML = "Wind Speed: " + response.data.list[forecastndex].wind.speed + " MPH";
            forecastElement[i].append(forecastWindEl);

                }
            })
        })
    }
    // get searched cities from local storage
    searchElement.addEventListener("click", function(){
        var searchVal = cityElement.value;
        getWeather(searchVal);
        searchHistory.push(searchVal);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHist();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function renderSearchHist() {
        cityHistory.innerHTML = "";
        for (var i = 0; i < searchHistory.length; i++) {
            var searchItem = document.createElement("input");
            searchItem.setAttribute("type", "text");
            searchItem.setAttribute("readonly", true);
            searchItem.setAttribute("class", "form-control d-block bg-white");
            searchItem.setAttribute("value", searchHistory[i]);
            searchItem.addEventListener("click", function (){
                getWeather(searchItem.value);
            })
            cityHistory.append(searchItem);
        }
    }

    renderSearchHist();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }

}

startSite();


console.log("hi test");