const apikey = "16ff385ccee4bb808261f4842c0832eb";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".WindSpeed").innerHTML = data.wind.speed + " Km/h";

    if (data.dt >= data.sys.sunrise && data.dt <= data.sys.sunset) {
      if (data.weather[0].main == "Cloud") {
        weathericon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Drizzle") {
        weathericon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Rain") {
        weathericon.src = "images/rain.png";
      } else if (data.weather[0].main == "Snow") {
        weathericon.src = "images/snow.png";
      } else {
        weathericon.src = "images/clear.png";
      }
    } else {
      weathericon.src = "images/night2.webp";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
