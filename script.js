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

var geUrlUv = 'https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}';

$ajax({
    url: getUrlUvi,
    method: 'GET',
}).then(function (response){
    var pUviElement = $('<p>').text('UV Index: ');
    var uviSpan = $('<span>').text(response.current.uvi);
    var uvi = response.current.uvi;
    pUviElement.append(uviSpan);
    cardBodyToday.append(pUviElement);

    if (uvi >= 0 && uvi <= 2) {
        uviSpan.attr('class', 'green');
    } else if (uvi > 2 && uvi <= 5) {
        uviSpan.attr('class', 'yellow')
    } else if (uvi > 5 && uvi <+ 7) {
        uviSpan.attr('class', 'orange')
    } else if (uvi > 7 && uvi <= 10) {
        uviSpan.attr('class', 'red')
    } else {
        uviSpan.attr('class', 'purple')
    }
});
// end of current weather

});
};

var fiveDayForcast = $(',fiveDay');

function getFiveDayForcast(){
    var getUrlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}';

    $ajax({
        url: getUrlFiveDay,
        method: 'GET',
    }).then(function (response){
        var fiveDayList = response.list;
        var fiveWeather = [];

        $.each(fiveDayList, function (index, value) {
            testObj = {
                date: value.dt_txt.split(' ')[0],
                time: value.dt_txt.split(' ')[1],
                temp: value.main.temp,
            }
        })
    })
}
