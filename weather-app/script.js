const mainTemp = document.querySelector("#main-temp");
const realFeel = document.querySelector("#real-data");
const windSpeed = document.querySelector("#wind-data");
const humidityData = document.querySelector("#humidity-data");
const cloudData = document.querySelector("#cloud-data");
const cityData = document.querySelector("#city");
const searchBtn = document.querySelector("#search-btn");
const API_KEY = `3edd9b17ea78a017b027e5e023fa227f`;
const limit = 1;
function listen() {
  let city = document.querySelector("#input-city").value;
  fatchData(city);
}

async function fatchData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const result = await response.json();
    console.log(result);
    cityData.innerText = result.name;
    mainTemp.innerText = result.main.temp;
    realFeel.innerText = result.main.feels_like;
    windSpeed.innerText = result.wind.speed;
    humidityData.innerHTML = result.main.humidity;
    cloudData.innerText = result.main.pressure;
  } catch (error) {
    console.error(error);
  }
}
// fatchData("Delhi");

async function currentLocation() {
  try {
    if ("geolocation" in navigator) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      // const API_KEY = 'your_api_key_here'; // Replace with your actual API key
      // const limit = 1; // Adjust as needed
      const currLoc = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${API_KEY}`
      );

      const data = await currLoc.json();
      console.log(data);
      fatchData(data[0].name);
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  } catch (error) {
    console.error(error);
  }
}

currentLocation();
