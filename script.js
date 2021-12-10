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

            // uv inder
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
        })
    }


}


console.log("hi test");