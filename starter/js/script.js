var City = "London";
var NumberOfDay = 5;


$('#search-button').on("click",function(event){
    event.preventDefault();
    City = $('#search-input').val();

    todayHeading = $('<div>').text(`${City} (${dayjs().format('DD/MM/YYYY')})`);
    TodayBox.append(todayHeading);
    
    
})

var City = $('#search-input').val();
console.log(City);



var TodayBox = $('#today');



// todayHeading.text(City);


var Forecast = $('#forecast');
ForcastHeader = $('<div>').text(`${NumberOfDay}-Day Forecast:`);
Forecast.append(ForcastHeader);
for(var i = 0; i<NumberOfDay;i++){
    ForecastBox = $('<div>').addClass("card")
    ForecastDate = $('<p>').text(dayjs().format('DD/MM/YYYY'))
    ForecastBox.append(ForecastDate);
    Forecast.append(ForecastBox);
}


ForecastBox = $('<div>').addClass("card")
ForecastDate = $('<p>').text(dayjs().format('DD/MM/YYYY'))

var APIKey = "ffd05df6c97797788dd5eb72d5a56cb0"
var lat
var lon



// var queryURL_Geo = `http://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=${APIKey}`
var queryURL_Geo = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${APIKey}`


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
                    

                    console.log(Date);
                    console.log(Icon);
                    console.log(Temp);
                    console.log(Wind);
                    console.log(Humidity);

                }

        });

        


});



// http://openweathermap.org/img/w/10d.png


