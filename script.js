src = "https://code.jquery.com/jquery-3.4.1.min.js"
// var key = db51c4803ad66580db1682e7df54580f;
var city = "Enter City Here"

var cityList = [];

$('.search-btn').on("click", function (search) {
    search.preventDefault();
    city = $(this).parent('.city-input-btn').siblings('.textValue').val().trim();
    if (city === "") {
        return;
    };
    cityList.push(city);

    localStorage.setItem('city', JSON.stringify(cityList));

    console.log(search());


});
