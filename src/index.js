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
  const city = document.querySelector('h1');
  const status = document.querySelector('h2');
  const temperature = document.querySelector('h3');
  const humidity = document.querySelector('h4');
  city.textContent = `${weather.name} (${weather.country})`;
  status.textContent = weather.status;
  temperature.textContent = weather.temperature;
  humidity.textContent = weather.humidity;
  const container = document.querySelector('main');
  container.id = weather.status;
  container.append(city, status, temperature, humidity);
}

const input = document.querySelector('input');
const getWeather = function() {
  fetchWeather(input.value)
    .then(function(data) {
      displayWeather(parseWeather(data));
    })
    .catch(function() {
      alert('Please, enter a valid city.');  // I could do better but I don't want to spend much time in this for now.
    });
}

input.addEventListener('keydown', function(event) {
  if(event.key === 'Enter') {
    getWeather();
  }
});

const button = document.querySelector('button');
button.addEventListener('click', getWeather);
