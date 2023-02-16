// Search input elements
var citySearchHistoryEl = document.getElementById('city-search-history');
var citySearchButtonEl = document.getElementById('city-search-btn');
var citySearchInputEl = document.getElementById('city-search-input');

var citySearchInput;
var citySearchHistoryString;
var citySearchHistoryArray = [];
  
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
        localStorageStringToArray();
        citySearchInputEl.value = "";
    }  
};

citySearchButtonEl.addEventListener('click', citySearch);