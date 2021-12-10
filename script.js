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


}