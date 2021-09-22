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
var date = document.querySelector('.date')
var dateValue = new Date();
var opac = document.querySelector('.display');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
date.innerHTML = dateValue.getDate() + " " + monthNames[dateValue.getMonth()] + " " + dateValue.getFullYear();

function loopoff() {
    document.querySelector('.animation').style.display = 'none'
}
function loopon() {
    document.querySelector('.animation').style.display = 'flex'
}

inputValue.addEventListener('keyup', () => {
    if (inputValue.value.length == 0)
        btn.disabled = true;
    else
        btn.disabled = false;
})

function change(data) {
    let nameValue = data['name'] + "," + data['sys']['country'] + " " + (data['main']['temp'] - 273.5).toFixed(2) + " \u00B0C";
    let descValue = "<b>" + data['weather'][0]['description'][0].toUpperCase() + data['weather'][0]['description'].slice(1).toLowerCase() + "</b>";
    let max_Value = "<b>Max</b>: " + (data['main']['temp_max'] - 273.15).toFixed(2) + " \u00B0C"
    let min_Value = "<b>Min</b>: " + (data['main']['temp_min'] - 273.15).toFixed(2) + " \u00B0C";
    let latValue = "<b>Latitude: </b>" + data['coord']['lat'] + " ";
    let lonValue = "<b>Longitude: </b>" + data['coord']['lon'];
    let humidityValue = "<b>Humidity: </b>" + data['main']['humidity'] + " %";
    var date_temp1 = new Date(data['sys']['sunrise'] * 1000);
    var date_temp2 = new Date(data['sys']['sunset'] * 1000);
    let srValue = "<b>Sunrise: </b>" + date_temp1.getHours() + ":" + date_temp1.getMinutes();
    let ssValue = "<b>Sunset: </b>" + date_temp2.getHours() + ":" + date_temp2.getMinutes();
    let windValue = "<b>Wind Speed: </b>" + data['wind']['speed'] + " Km/hr";
    let pressureValue = "<b>Pressure: </b>" + data['main']['pressure'] + " hPa";
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
    date.innerHTML = dateValue.getDate() + " " + monthNames[dateValue.getMonth()] + " " + dateValue.getFullYear();
    loopoff()

    opac.style.opacity = 0;
    var my = setInterval(work, 50);
    function work() {
        opac.style.opacity = parseFloat(opac.style.opacity) + .1;
        if (parseFloat(opac.style.opacity) == 1)
            clearInterval(my);
    }
}

function nochange() {
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

    img.setAttribute("src", "");
    document.querySelector('.prop').style.display = "none";
    date.innerHTML = dateValue.getDate() + " " + monthNames[dateValue.getMonth()] + " " + dateValue.getFullYear();
    loopoff()

    opac.style.opacity = 0;
    var my = setInterval(work, 50);
    function work() {
        opac.style.opacity = parseFloat(opac.style.opacity) + .1;
        if (parseFloat(opac.style.opacity) == 1.1)
            clearInterval(my);
    }
}

btn.addEventListener('click', () => {
    loopon();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=06d0a7fcf71b3d545247811a0c62309c`)
        .then(response => response.json())
        .then(data => {
            change(data);
        })
        .catch(err => {
            nochange();
        })
})
function render() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            loopon()
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=06d0a7fcf71b3d545247811a0c62309c`)
                .then(response => response.json())
                .then(data => {
                    change(data)
                })
                .catch(err => {
                    namec.innerHTML = "Hello viewer!!😀\n Turn on your GPS to know your Current Location's Weather Report";
                    loopoff();
                });
        }, (err) =>
            namec.innerHTML = "Hello viewer!!😀\n Turn on your GPS to know your Current Location's Weather Report");
        document.querySelector('.animation').style.display = 'none'
    }
}
