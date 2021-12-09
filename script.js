// var key = db51c4803ad66580db1682e7df54580f;
var city = "Enter City Here"

var cityList = [];

// current weather info section
var cardBodyToday = $('.cardBody')
function getWeatherToday() {
var getUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}';

$(cardBodyToday).empty();

$ajax({
    url: getUrlCurrent,
    method: 'GET',
}).then(function (response){
    $('.cardTodayCityName').text(response.name);
    $('.cardTodayDate').text(date);

    // icons needed 

    // temp
    var pElement = $('<p>').text('Temperature: ${response.main.temp} °F');
    cardBodyToday.append(pElement);
    // feels like 
    var pTemElement = $('<p>').text('Feels Like: ${response.main.feels_like} °F');
    cardBodyToday.append(pTemElement);
    // humidity
    var pHumElement = $('<p>').text('Humidity: ${response.main.humidity} %');
    cardBodyToday.append(pHumElement);
    // wind
    var pWindElement = $('<p<').text('Wind Speed: ${response.wind.speed} MPH');
    cardBodyToday.append(pWindElement);

    var cityLon = response.coord.lon;
    var cityLat = response.coord.lat;


})
}
