const apiKey = "41a92aef3861c9cf2f3395a7122adf82"; // Replace with my OpenWeatherMap API Key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    }, error => {
      alert("Location access denied or unavailable.");
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}
function toggleTheme() {
  const icon = document.getElementById("themeIcon");
  const container = document.querySelector(".container");
  const body = document.body;

  container.classList.toggle("dark");
  body.classList.toggle("dark-mode");

  if (icon.textContent === "☀️") {
    icon.textContent = "🌙";
    icon.style.transform = "rotate(180deg)";
  } else {
    icon.textContent = "☀️";
    icon.style.transform = "rotate(0deg)";
  }
}


function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const icon = data.weather[0].icon;
const weatherHTML = `
  <h2>${data.name}, ${data.sys.country}</h2>
  <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" />
  <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
  <p>🌡️ Temperature: ${data.main.temp}°C</p>
  <p>💧 Humidity: ${data.main.humidity}%</p>
  <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
`;

      document.getElementById("weatherInfo").innerHTML = weatherHTML;
    })
    .catch(error => {
      document.getElementById("weatherInfo").innerHTML = "<p>Could not fetch weather data.</p>";
    });
}
