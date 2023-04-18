
document.getElementById('location').style.display = 'none';
document.getElementById('forecastD').style.display = 'none';

//Button:

var button = document.getElementById("search-button")
var search = $("#search-input")

button.addEventListener("click", function(event){
    event.preventDefault();
    var currentVal = search.val();

    getWeatherData(currentVal).then(function(data){
        displayWeatherData(data);
    });
        
    getForecastData(currentVal).then(function(forecastData){
        displayForecastData(forecastData);
    })
    
    var cities = JSON.parse(localStorage.getItem("cityNames"));
       
      if (!cities){
        cities = [];
      }
      if(!cities.find(city => city == currentVal)){
        cities.push(currentVal); 
      }

    localStorage.setItem("cityNames", JSON.stringify(cities));
});

var cityList = JSON.parse(localStorage.getItem("cityNames"));
var list = document.getElementById("history");


if (cityList){
    for(var i = 0; i < cityList.length; i++){
        var li = document.createElement("li");
        li.innerText = cityList[i];
        list.appendChild(li);
    }
} 
