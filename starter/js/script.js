var City = "London";
var APIKey = "ffd05df6c97797788dd5eb72d5a56cb0"
var NumberOfDay = 5;
var ForecastIcon
var lat
var lon
var Forecast = $('#forecast');
var queryURL_Geo = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${APIKey}`




ForcastHeader = $('<div>').text(`${NumberOfDay}-Day Forecast:`);
Forecast.append(ForcastHeader);

$('#search-button').on("click",function(event){
    event.preventDefault();
    City = $('#search-input').val();
    todayHeading = $('<div>').text(`${City} (${dayjs().format('DD/MM/YYYY')})`);
    TodayBox.append(todayHeading);
})

var City = $('#search-input').val();
console.log(City);


var TodayWeather = $('#today');
TodayBox = $('<div>').addClass("card").attr(id="TodayBox");
// Today.append(TodayBox);



fetch(queryURL_Geo)
    // After the data comes back from the API
    .then(function (response) {
      return response.json();
    })
    .then(function (dataGeo) {
        lat = dataGeo[0].lat;
        lon = dataGeo[0].lon;
        
        var queryURL_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
        fetch(queryURL_weather)
            // After the data comes back from the API
            .then(function (response) {
              return response.json();
            })
            .then(function (dataWeather) {
                console.log(dataWeather)
                var Icon = dataWeather.weather[0].icon;
                var IconUrl = `http://openweathermap.org/img/w/${Icon}.png`
                var Temp = dataWeather.main.temp;
                var Wind = dataWeather.wind.speed;
                var Humidity = dataWeather.main.humidity;
                console.log(Icon);
                console.log(IconUrl);
                console.log(Temp.toFixed(2) -273.15+" °C");
                console.log(Wind + " KPH");
                console.log(Humidity + " %");
        });

        var queryURL_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
        fetch(queryURL_forecast)
            // After the data comes back from the API
            .then(function (response) {
              return response.json();
            })
            .then(function (dataForecast) {
                console.log(dataForecast)
                for (var i = 0; i <dataForecast.list.length; i+=8){
                    var Date = dataForecast.list[i].dt_txt;
                    var Icon = dataForecast.list[i].weather[0].icon;
                    var Temp = dataForecast.list[i].main.temp;
                    var Wind = dataForecast.list[i].wind.speed;
                    var Humidity = dataForecast.list[i].main.humidity;
                    
                    var ForecastBox = $('<div>').addClass("card")
                    var ForecastDate = $('<p>').text(dayjs(Date).format('DD/MM/YYYY')).addClass("card-date");
                    var ForecastIcon = $('<img>').addClass("icon").attr('src', `http://openweathermap.org/img/w/${Icon}.png`);
                    var ForecastTemp = $('<p>').text(`Temp: ${(Temp-273.15).toFixed(2)} °C`)
                    var ForecastWind = $('<p>').text(`Wind: ${Wind} KPH`)
                    var ForecastHumidity = $('<p>').text(`Humidity: ${Humidity} %`)
                    ForecastBox.append(ForecastDate, ForecastIcon, ForecastTemp, ForecastWind, ForecastHumidity);
                    Forecast.append(ForecastBox);
                }
        });
});
