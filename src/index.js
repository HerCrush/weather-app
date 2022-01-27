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
    icon: fetchedData.weather[0].icon,
    timeOfDay: fetchedData.weather[0].icon.slice(-1)
  };
  return weatherData;
}

const displayWeather = function(weather) {
  const city = document.querySelector('h1');
  const status = document.querySelector('h2');
  const temperature = document.querySelector('h3');
  const humidity = document.querySelector('h4');
  const icon = document.querySelector('#weather-icon');
  city.textContent = `${weather.name} (${weather.country})`;
  status.textContent = weather.status;
  temperature.textContent = weather.temperature;
  humidity.textContent = weather.humidity;
  icon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  document.body.dataset.weather = weather.status;
  document.body.dataset.time = weather.timeOfDay;
}

const input = document.querySelector('input');
const getWeather = function() {
  fetchWeather(input.value)
    .then(function(data) {
      displayWeather(parseWeather(data));
    })
    .catch(function() {
      alert('Please, enter a valid city.');  // I could do better but I don't want to spend much time on this for now.
    });
}

input.addEventListener('keydown', function(event) {
  if(event.key === 'Enter') {
    getWeather();
  }
});

const button = document.querySelector('button');
button.addEventListener('click', getWeather);
