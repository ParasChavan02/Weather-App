// weather.js
// Handles fetching and displaying weather data from OpenWeatherMap API

const API_KEY = "eccd8cd00d770afbadfc543a9480673c"; // WARNING: Do not expose in production
const CITY = "pune";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;

function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
}

function updateWeatherDisplay(data) {
    document.getElementById('location').textContent = data.name;
    document.getElementById('weather').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = kelvinToCelsius(data.main.temp);
    document.getElementById('icon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.getElementById('icon').alt = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}`;
    document.getElementById('wind').textContent = `${data.wind.speed}`;
}

function showError(message) {
    document.getElementById('location').textContent = '';
    document.getElementById('weather').textContent = message;
    document.getElementById('temp').textContent = '';
    document.getElementById('icon').src = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
}

function fetchWeather() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.cod && data.cod !== 200) {
                showError('Error: ' + (data.message || 'Unable to fetch weather'));
            } else {
                updateWeatherDisplay(data);
            }
        })
        .catch(() => {
            showError('Network/API error');
        });
}

document.addEventListener('DOMContentLoaded', fetchWeather);
document.getElementById('refresh-btn').addEventListener('click', fetchWeather);
