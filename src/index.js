import './reset.css';
import './style.css';

const fetchWeather = async function(city) {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=433cc5baf54233a15ed6c8c968fd822c`, {mode: 'cors'});
  const fetchedData = await response.json();
  return fetchedData;
}

const parseWeather = function(fetchedData) {
  const weatherData = {
    name: fetchedData.name,
    country: fetchedData.sys.country,
    status: fetchedData.weather[0].main,
    temperature: fetchedData.main.temp,
    humidity: fetchedData.main.humidity,
  };
  return weatherData;
}

const displayWeather = function(weather) {
  const city = document.createElement('h1');
  const status = document.createElement('h3');
  const temperature = document.createElement('h4');
  const humidity = document.createElement('h5');
  city.textContent = `${weather.name} (${weather.country})`;
  status.textContent = weather.status;
  temperature.textContent = weather.temperature;
  humidity.textContent = weather.humidity;
  const container = document.querySelector('main');
  container.append(city, status, temperature, humidity);
}

const getWeather = function() {
  const input = document.querySelector('input');
  fetchWeather(input.value)
    .then(function(data) {
      displayWeather(parseWeather(data));
    });
}

const button = document.querySelector('button');
button.addEventListener('click', getWeather);
