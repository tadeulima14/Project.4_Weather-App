const apiKey = '628334ae830de6763bbdd646a69b7964';
let cityName = 'chicago';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
const searchBtn = document.querySelector('.searchbar button');

// Make the API request
async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    updateWeatherData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Event listener for the search button
if (searchBtn) {
  searchBtn.addEventListener('click', function () {
    searchCity();
  });
}

// Function to search for a city
function searchCity() {
  const userInput = document.getElementById('cityInput').value;
  if (userInput.trim() !== '') {
    cityName = userInput;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetchWeatherData();
  }
}

// Function to update weather data on the page. locates html classes
function updateWeatherData(data) {
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F';
  document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' Kts/hr';
}

fetchWeatherData();
