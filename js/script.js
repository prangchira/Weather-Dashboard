var APIKey = "ffd05df6c97797788dd5eb72d5a56cb0"
var TodayWeather = $('#today');
var Forecast = $('#forecast');
var Line = $('.hr');
var SearchForm = $('.form');
var City
var ForecastIcon
var lat
var lon
var PreviousSearch = [];

//Clear localStorage upon refreshing the page
localStorage.clear();

$('#search-button').on("click",function(event){
    event.preventDefault();
    //Get input from the Search input form
    City = $('#search-input').val();

    //Empty all previous search list below the line below serach button
    Line.empty();
    // PreviousSearch = JSON.parse(localStorage.getItem("StoredSearch")) || [];
    //Add the City at beginning of PreviouSearch array list
    PreviousSearch.unshift(City);
    for (var i =0; i<PreviousSearch.length;i++){
      var PrevSearchButton = $('<button>').addClass("PrevSearchButton");
      PrevSearchButton.text(PreviousSearch[i]);
      Line.append(PrevSearchButton);
    }
    //Store the search list into localStorage
    localStorage.setItem('StoredSearch', JSON.stringify(PreviousSearch));
    
    //Empty all previous weather and data results and HTML elements
    TodayWeather.empty();
    Forecast.empty();
    
    
    //Create the Box for Today weather
    var TodayBox = $('<div>').addClass("container").attr('id','TodayBox');
    //Create h1 element for heading and add it into a div container in order to aligh the icon to be in the center in CSS
    var HeadingContainer = $('<div>').addClass("container-heading");
    var todayHeading = $('<h1>').text(`${City.charAt(0).toUpperCase()+City.slice(1)} (${dayjs().format('DD/MM/YYYY')})`);    //format City to make sure it display with capital letter
    TodayWeather.append(TodayBox);
    HeadingContainer.append(todayHeading)
    TodayBox.append(HeadingContainer)
    
    //Create the Box for the forcast and set it in container for CSS styling
    ForecastHeader = $('<h3>').text(`5-Day Forecast:`).addClass('ForecastHeader');
    ForecastContainer = $('<div>').addClass('ForecastContainer col');
    Forecast.append(ForecastHeader, ForecastContainer);


    //Create URL for API fetch to get latitude and longtitude from the City input
     queryURL_Geo = `https://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=${APIKey}`

    //Fetch API for the City name
    fetch(queryURL_Geo)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataGeo) {
        //get the lat and lon coordinate for the URL query to fetch weather and forecast data
        lat = dataGeo[0].lat;
        lon = dataGeo[0].lon;
        //Create URL for Today weather fetch with latitude and longtitude data
        var queryURL_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
        fetch(queryURL_weather)
            .then(function (response) {
              return response.json();
            })
            .then(function (dataWeather) {
                //Get the current weather data from the API fetch
                var Icon = dataWeather.weather[0].icon;
                var IconUrl = `https://openweathermap.org/img/w/${Icon}.png`
                var Temp = dataWeather.main.temp;
                var Wind = dataWeather.wind.speed;
                var Humidity = dataWeather.main.humidity;
                //Create HTML items in the TodayBox for the current weather and display the values from the fetch
                var WeatherIcon = $('<img>').addClass("iconToday").attr('src', IconUrl);
                var WeatherTemp = $('<p>').text(`Temp: ${(Temp-273.15).toFixed(2)} °C`)
                var WeatherWind = $('<p>').text(`Wind: ${Wind} KPH`)
                var WeatherHumidity = $('<p>').text(`Humidity: ${Humidity} %`)
                
                TodayBox.append(WeatherIcon, WeatherTemp, WeatherWind, WeatherHumidity);
                HeadingContainer.append(WeatherIcon);

        });
        //Create URL for Forecast fetch
        var queryURL_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
        fetch(queryURL_forecast)
            .then(function (response) {
              return response.json();
            })
            .then(function (dataForecast) {
                //For each card in Forecast, get date, icon, temp, wind, humidity data from the API fetch result
                for (var i = 0; i <dataForecast.list.length; i+=8){
                    var Date = dataForecast.list[i].dt_txt;
                    var Icon = dataForecast.list[i].weather[0].icon;
                    var IconUrl = `https://openweathermap.org/img/w/${Icon}.png`
                    var Temp = dataForecast.list[i].main.temp;
                    var Wind = dataForecast.list[i].wind.speed;
                    var Humidity = dataForecast.list[i].main.humidity;
                    
                    //Create HTML item to display each data in the card
                    var ForecastBox = $('<div>').addClass("card col-lg-4 col-md-4 col-sm-12")
                    var ForecastDate = $('<p>').text(dayjs(Date).format('DD/MM/YYYY')).addClass("card-date");
                    var ForecastIcon = $('<img>').addClass("icon").attr('src', IconUrl);
                    var ForecastTemp = $('<p>').text(`Temp: ${(Temp-273.15).toFixed(2)} °C`)
                    var ForecastWind = $('<p>').text(`Wind: ${Wind} KPH`)
                    var ForecastHumidity = $('<p>').text(`Humidity: ${Humidity} %`)
                    ForecastBox.append(ForecastDate, ForecastIcon, ForecastTemp, ForecastWind, ForecastHumidity);
                    ForecastContainer.append(ForecastBox);
                }
        });
});

})