// Search input elements
var citySearchHistoryEl = document.getElementById('city-search-history');
var citySearchButtonEl = document.getElementById('city-search-btn');
var citySearchInputEl = document.getElementById('city-search-input');
var stateSelectorEl = document.getElementById('state-selector');

// Current Weather elements
var currentDateEl = document.getElementById('current-date');
var currentCityEl = document.getElementById('city-name');
var currentTempEl = document.getElementById('current-temp');
var currentWindEl = document.getElementById('current-wind');
var currentHumidityEl = document.getElementById('current-humidity');
var currentWeatherIconEl = document.getElementById('current-weather-icon');

// Open Weather API Call
// API Key, get your key here  https://openweathermap.org/forecast5
var openWeatherMapForecast = function () {
    var apiKey = "7d5b7e2240f4ddcf43e49911d92c7be7";
    var apiLocUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + citySearchInput + ","+ stateSelected +",us&limit=1&appid=" + apiKey;
    var cityCoordinatesLat;
    var cityCoordinatesLon;
    // first API call to retrieve city details including coordinates
    fetch(apiLocUrl)
      .then(function (cityLocationResponse) {
        if (cityLocationResponse.ok) {
          return cityLocationResponse.json();
        } else {
          alert("Error: API couldnt not be reached \nMessage: " + cityLocationResponse.statusText);
        }
        })
        .then(function (cityData) {
        if (cityData.length === 0) {
            alert("City Not found");
        } else {
            cityCoordinatesLat = cityData[0].lat;
            cityCoordinatesLon = cityData[0].lon;
            var cityCordinatesName = cityData[0].name;
            var cityCoordinatesState = cityData[0].state;
            var cityCoordinatesCountry = cityData[0].country;
            currentCityEl.textContent = cityCordinatesName + ", " + cityCoordinatesState + ", " + cityCoordinatesCountry;
            console.log(cityCoordinatesLat,cityCoordinatesLon,cityCordinatesName,cityCoordinatesState,cityCoordinatesCountry);
        }
    });
};




var citySearchInput = 'Miami';
var citySearchHistoryString;
var citySearchHistoryArray = [];
var stateSelected = 'FL';
  
function localStorageStringToArray() {
    citySearchHistoryString = localStorage.getItem('citysearch');
    if (citySearchHistoryString === null) {
        citySearchHistoryArray.push(citySearchInput);
        localStorage.setItem("citysearch", JSON.stringify(citySearchHistoryArray));
        console.log("New city added: " + citySearchHistoryArray);
    }else {
        citySearchHistoryArray = JSON.parse(citySearchHistoryString);
        citySearchHistoryArray.push(citySearchInput);
        localStorage.setItem("citysearch", JSON.stringify(citySearchHistoryArray));
       console.log("Additional city added: " + citySearchHistoryArray); 
    }  
}
   
function citySearch() {
    citySearchInput = citySearchInputEl.value.trim();
    if (citySearchInput == 0) {
        alert("Enter a search value");
        return;
    } else {
        //localStorageStringToArray();
        stateSelected = stateSelectorEl.value.trim();
        openWeatherMapForecast(citySearchInput,stateSelected);
        citySearchInputEl.value = "";
        //console.log(stateSelected);
    }  
};


openWeatherMapForecast();
citySearchButtonEl.addEventListener('click', citySearch);