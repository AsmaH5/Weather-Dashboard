
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

async function getWeatherData(searchValue) {
    var response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=7c55eabe41a6d9a04ba0296a7cd914b8&units=metric`);
    const data = await response.json();
    console.log(data);
    return data;
}


function displayWeatherData(data){
    document.getElementById('location').style.display = 'block';
    
     var city = data.name
     var image = $(".image-main")
     var temp = data.main.temp
     var humidity = data.main.humidity
     var wind = data.wind.speed

     var rightNow = moment().format('DD MMM YYYY');

     image.attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

     $("#city").html(city +" "+ rightNow);
     $("#temperature").html("Temperature: " + temp + " "+ "°C");
     $("#humidity").html("Humidity: " +humidity + " "+ "%");
     $("#wind-speed").html("Wind Speed: " +wind);
     
}

//5Day Forecasts:

async function getForecastData(searchValue) {
    var response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=7c55eabe41a6d9a04ba0296a7cd914b8&units=metric`);
    const data = await response.json();
    console.log(data);
    var fiveDayForecast = {};
    var date; 
    // var currentDate = moment().format('YYYY-MM-DD');

    data.list.map(item => {
        date = item.dt_txt.slice(0, 10);
        // if (currentDate != date){
            if (!fiveDayForecast[date]){
                fiveDayForecast[date] = [];
                fiveDayForecast[date].push(item);
            }
        // }
    });

    console.log(fiveDayForecast)

    return fiveDayForecast;
}

function displayForecastData(data){
    document.getElementById('forecastD').style.display = 'flex';

    var date1 = $('.date1');
    var img1 = $(".image1");
    var temp1 = $('.temp1');
    var wind1 = $('.wind1');
    var humidity1 = $('.humidity1');

   

    date1.html(Object.values(data)[0][0].dt_txt.slice(0, 10))
    img1.attr("src", "https://openweathermap.org/img/w/" + (Object.values(data)[0][0].weather[0].icon + ".png"))
    temp1.html("Temperature: " + Object.values(data)[0][0].main.temp+ " "+ "°C")
    humidity1.html("Humidity: " + Object.values(data)[0][0].main.humidity +" "+ "%")
    wind1.html("Wind Speed: " + Object.values(data)[0][0].wind.speed)

    var date2 = $('.date2');
    var img2 = $(".image2");
    var temp2 = $('.temp2');
    var wind2 = $('.wind2');
    var humidity2 = $('.humidity2');
   

    date2.html(Object.values(data)[1][0].dt_txt.slice(0, 10))
    img2.attr("src", "https://openweathermap.org/img/w/" + (Object.values(data)[1][0].weather[0].icon + ".png"))
    temp2.html("Temperature: " +Object.values(data)[1][0].main.temp+ " "+ "°C")
    humidity2.html("Humidity: " +Object.values(data)[1][0].main.humidity+ " "+ "%")
    wind2.html("Wind Speed: " +Object.values(data)[1][0].wind.speed)
    

    var date3 = $('.date3');
    var img3 = $(".image3");
    var temp3 = $('.temp3');
    var wind3 = $('.wind3');
    var humidity3 = $('.humidity3');
   

    date3.html(Object.values(data)[2][0].dt_txt.slice(0, 10))
    img3.attr("src", "https://openweathermap.org/img/w/" + (Object.values(data)[2][0].weather[0].icon + ".png"))
    temp3.html("Temperature: " +Object.values(data)[2][0].main.temp+ " "+ "°C")
    wind3.html("Wind Speed: " +Object.values(data)[2][0].wind.speed)
    humidity3.html("Humidity: " +Object.values(data)[2][0].main.humidity+ " "+ "%")
    

    var date4 = $('.date4');
    var img4 = $(".image4");
    var temp4 = $('.temp4');
    var wind4 = $('.wind4');
    var humidity4 = $('.humidity4');
   

    date4.html(Object.values(data)[3][0].dt_txt.slice(0, 10))
    img4.attr("src", "https://openweathermap.org/img/w/" + (Object.values(data)[3][0].weather[0].icon + ".png"))
    temp4.html("Temperature: " +Object.values(data)[3][0].main.temp+ " "+ "°C")
    wind4.html("Wind Speed: " +Object.values(data)[3][0].wind.speed)
    humidity4.html("Humidity: " +Object.values(data)[3][0].main.humidity+ " "+ "%")

    var date5 = $('.date5');
    var img5 = $(".image5");
    var temp5 = $('.temp5');
    var wind5 = $('.wind5');
    var humidity5 = $('.humidity5');
   

    date5.html(Object.values(data)[4][0].dt_txt.slice(0, 10))
    img5.attr("src", "https://openweathermap.org/img/w/" + (Object.values(data)[4][0].weather[0].icon + ".png"))
    temp5.html("Temperature: " +Object.values(data)[4][0].main.temp+ " "+ "°C")
    wind5.html("Wind Speed: " +Object.values(data)[4][0].wind.speed)
    humidity5.html("Humidity: " +Object.values(data)[4][0].main.humidity+ " "+ "%")


}
