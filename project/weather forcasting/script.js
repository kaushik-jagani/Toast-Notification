const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const search =document.getElementById('search');
const btn = document.getElementById('btn');

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "f993c10a8e12e3bf07ef004c3b1feb53";
// const API_KEY ='N22LZNKRF4RV4GARZTAW5DJXZ'
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursFormate = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const variable = minutes < 10 ? "0" : "";
  //update webpage
  timeEl.innerHTML =
    (hoursFormate < 10 ? '0'+hoursFormate : hoursFormate) +
    ":" +
    variable +
    minutes +
    " " +
    `<span id="am-pm"> ${ampm} </span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);



// const searchRes=search.value;

// function getDimension(e){
//   fetch(
//     `http://api.openweathermap.org/geo/1.0/direct?q=${searchRes}&appid=${API_KEY}`
//   ).then((rese) => rese.json())
//     .then((dataa) => {
//       // const lat=dataa[0].lat;
//       // const lon=dataa[0].lan;
//       console.log(dataa[0].lat);
//       getData(lat,lon);
//     });
//     e.preventDefault();
// }

// // click on button
// btn.addEventListener("click",getDimension);

getData()

function getData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise,sunset, wind_speed, clouds } = data.current;
  
  timezone.innerHTML=data.timezone;

  currentWeatherEl.innerHTML = `<div class="weather-item">
    <div>Humadity</div>
    <div>${humidity}</div>
    </div>
    <div class="weather-item">
    <div>Presure</div>
    <div>${pressure}</div>
    </div>
    <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
    <div>Sunrise :)</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
    <div>Clouds</div>
    <div>${clouds}</div>
    </div>
    `;

    let otherDayForecast =``;
    data.daily.forEach((day,idx) =>{
        if(idx == 0){
            currentTempEl.innerHTML=` <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt* 1000).format('ddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.night}&#176; C</div>
            </div>`
        }else{
            otherDayForecast +=`
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt* 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.night}&#176; C</div>
            </div>
            `
        }
    })

    weatherForecastEl.innerHTML=otherDayForecast;
}
