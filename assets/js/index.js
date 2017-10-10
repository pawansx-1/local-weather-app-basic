var api = "https://fcc-weather-api.glitch.me/api/current?";
var lot, lan;
var tempUnit = 'C';
var currentTempInCelsius;
var wind_deg;
$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = "lat=" + position.coords.latitude;
            var lon = "lon=" + position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        console.log("This browser don't support geolocation")
    }
});

$("#tempunit").click(function() {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
        var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
});

function getWeather(lat, lon) {
    var urlString = api + lat + "&" + lon;
    var wind_deg;
    $.ajax({
        url: urlString,
        success: function(result) {

            $("#city").text(result.name + ", ");
            $("#country").text(result.sys.country);
            currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
            $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
            $("#tempunit").text(tempUnit);
            $("#desc").text(result.weather[0].main);
            IconGen(result.weather[0].main);
            $("#wind-speed").text(Math.round(result.wind.speed) + "km/h ");
            $("#humidity").text(Math.round(result.main.humidity) + "%");
            wind_deg = Math.round(result.wind.deg);
            console.log(wind_deg);
            $("#wind_deg").addClass("towards-" + wind_deg + "-deg");
        }
    });
}

function IconGen(desc) {
    var descp = desc.toLowerCase();

    switch (descp) {
        case 'drizzle':
            addIcon(descp);
            break;
        case 'clouds':
            addIcon(descp);
            break;
        case 'rain':
            addIcon(descp);
            break;
        case 'snow':
            addIcon(descp);
            break;
        case 'clear':
            addIcon(descp);
            break;
        case 'thunderstom':
            addIcon(descp);
            break;
        default:
            $('div.clouds').removeClass('hide');
    }
}

function addIcon(descp) {

    icond = 'i.' + descp;

    $(icond).removeClass('hide');
}