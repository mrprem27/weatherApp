var btn = document.querySelector('.btn');
var inputValue = document.querySelector('input');
var namec = document.querySelector('.name');
var img = document.querySelector('.img');
var descc = document.querySelector('.desc');
var max_temp = document.querySelector(".max_temp")
var min_temp = document.querySelector(".min_temp")
var lat = document.querySelector(".lat")
var lon = document.querySelector(".lon")
var pressure = document.querySelector(".pressure")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
var sunrise = document.querySelector(".sunrise");
var sunset = document.querySelector(".sunset");
var date = new Date();
inputValue.addEventListener('keyup', () => {
    if (inputValue.value.length == 0)
        btn.disabled = true;
    else
        btn.disabled = false;
})
btn.addEventListener('click', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=06d0a7fcf71b3d545247811a0c62309c`)
        .then(response => response.json())
        .then(data => {
            let nameValue = data['name'] + "," + data['sys']['country'] + " " + (data['main']['temp'] - 273.5).toFixed(2) + " \u00B0C";

            let descValue = "<b>" + data['weather'][0]['description'][0].toUpperCase() + data['weather'][0]['description'].slice(1).toLowerCase() + "</b>";

            let max_Value = "<b>Max</b>: " + (data['main']['temp_max'] - 273.15).toFixed(2) + " \u00B0C"
            let min_Value = "<b>Min</b>: " + (data['main']['temp_min'] - 273.15).toFixed(2) + " \u00B0C";

            let latValue = "<b>Latitude: </b>" + data['coord']['lat'] + " ";
            let lonValue = "<b>Longitude: </b>" + data['coord']['lon'];

            let humidityValue = "<b>Humidity: </b>" + data['main']['humidity'] + " gm/ml";

            var date_temp1 = new Date(data['sys']['sunrise'] * 1000);
            var date_temp2 = new Date(data['sys']['sunset'] * 1000);
            let srValue = "<b>Sunrise: </b>" + date_temp1.getHours() + ":" + date_temp1.getMinutes();
            let ssValue = "<b>Sunset: </b>" + date_temp2.getHours() + ":" + date_temp2.getMinutes();


            let windValue = "<b>Wind Speed: </b>" + data['wind']['speed'] + " Km/hr";
            let pressureValue = "<b>Pressure: </b>" + data['main']['pressure'] + " torr";


            img.setAttribute("src", `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`);

            wind.innerHTML = windValue;
            pressure.innerHTML = pressureValue;
            sunrise.innerHTML = srValue;
            sunset.innerHTML = ssValue;
            lat.innerHTML = latValue
            lon.innerHTML = lonValue
            max_temp.innerHTML = max_Value
            min_temp.innerHTML = min_Value
            humidity.innerHTML = humidityValue;
            namec.innerHTML = nameValue;
            descc.innerHTML = descValue;
            document.querySelector('.prop').style.display = "block";
            console.log(data);
        })
        .catch(err => {
            namec.innerHTML = "City is not present in the Database of Server!!";
            wind.innerHTML = "";
            pressure.innerHTML = "";
            sunrise.innerHTML = "";
            sunset.innerHTML = "";
            lat.innerHTML = "";
            lon.innerHTML = "";
            max_temp.innerHTML = "";
            min_temp.innerHTML = "";
            humidity.innerHTML = "";
            descc.innerHTML = "";
            img.setAttribute("src","");
            document.querySelector('.prop').style.display = "none";
        })
})

// base: "stations"
// clouds:
// all: 100
// cod: 200
// coord:
// lat: 26.65
// lon: 74.0333
// dt: 1631364672
// id: 1263120


// main:
// feels_like: 304.15
// grnd_level: 963
// humidity: 80
// pressure: 998
// sea_level: 998
// temp: 300.7
// temp_max: 300.7
// temp_min: 300.7
// name: "Merta"
// rain:
// 1h: 0.89
// sys:
// country: "IN"
// sunrise:321268
// sunset:366017
// timezone: 19800
// visibility: 10000
// weather: Array(1)
// 0:
// description: "light rain"
// icon: "10d"
// id: 500
// main: "Rain"
// length: 1
// [[Prototype]]: Array(0)
// wind:
// deg: 60
// gust: 6.92
// speed: 3.81
