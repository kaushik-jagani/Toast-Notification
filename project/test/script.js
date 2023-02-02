// const cityname = prompt("enter a city name");
const search =document.getElementById('search');
const btn = document.getElementById('btn');

const API_KEY = "f993c10a8e12e3bf07ef004c3b1feb53";


btn.addEventListener("click",display);

function display(e){
    document.getElementById('k').innerHTML=search.value
    e.preventDefault();
}
// if (cityname != undefined) {
//   getData();
// }

function getData() {


  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${API_KEY}`
  ).then((res) => res.json())
    .then((data) => {
      console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
      
    });
 
}
