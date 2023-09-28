const API_KEY = "8fe3369a7b5280026b9b3ad0ded977e6";
const searchLocation = document.querySelector(".bx-search");
let currLocation = document.querySelector("#search-input");
const container = document.querySelector(".container");
const weatherContainer = container.querySelector(".weather-container");
const weatherDetails = container.querySelector(".weather-details");
const errorMsg = container.querySelector(".error");

// listen for event
searchLocation.addEventListener("click", () => {
  const cityValue = currLocation.value.trim();
  if (cityValue === "") {
    alert("Empty Input");
  }
  fetchWeatherData(cityValue);
});

async function fetchWeatherData(cityValue) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  // Check if data response is OK
  if (data.cod === "404") {
    container.style["height"] = "400px";
    weatherContainer.style["display"] = "none";
    weatherDetails.style["display"] = "none";
    errorMsg.style["display"] = "flex";
    errorMsg.classList.add("fadeIn");
    return;
  }
  errorMsg.style["display"] = "none";
  errorMsg.classList.remove("fadeIn");

  const image = weatherContainer.querySelector("img");
  const temp = weatherContainer.querySelector(".temperature");
  const desc = weatherContainer.querySelector(".description");
  const humidityValue = weatherDetails.querySelector(".humidity__text span");
  const windValue = weatherDetails.querySelector(".wind__text span");

  //   Images based on weather
  switch (data.weather[0].main) {
    case "Clear":
      image.src = "images/clear.png";
      break;
    case "Rain":
      image.src = "images/rain.png";
      break;
    case "Snow":
      image.src = "images/snow.png";
      break;
    case "Haze":
      image.src = "images/haze.png";
      break;
    case "Clouds":
      image.src = "images/cloud.png";
      break;
    default:
      image.src = "";
  }
  temp.innerText = `${Math.round(data.main.temp)}°C`;
  desc.innerText = `${data.weather[0].description}`;
  humidityValue.innerText = `${Math.round(data.main.humidity)}%`;
  windValue.innerText = `${data.wind.speed} m/s`;

  //   Reset weather images
  weatherContainer.style["display"] = "";
  weatherDetails.style["display"] = "";
  weatherContainer.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style["height"] = "450px";
}
