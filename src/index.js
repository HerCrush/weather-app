import './reset.css';
import './style.css';
import icon1 from './black-24dp/2x/outline_refresh_black_24dp.png';

const loadingIcon = document.querySelector('#loading');
loadingIcon.src = icon1;
const fetchWeather = async function(city, unit) {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=433cc5baf54233a15ed6c8c968fd822c&units=${unit}`, {mode: 'cors'});
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

const unit = document.querySelector('#unit');
const displayWeather = function(weather) {
  const city = document.querySelector('h1');
  const status = document.querySelector('h2');
  const temperature = document.querySelector('h3');
  const humidity = document.querySelector('h4');
  const icon = document.querySelector('#weather-icon');
  city.textContent = `${weather.name} (${weather.country})`;
  status.textContent = weather.status;
  temperature.textContent = `${weather.temperature}${unit.textContent}`;
  humidity.textContent = `${weather.humidity}%`;
  icon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  document.body.dataset.weather = weather.status;
  document.body.dataset.time = weather.timeOfDay;
}

const input = document.querySelector('input');
const getWeather = function() {
  loadingIcon.classList.remove('hidden');
  fetchWeather(input.value, unit.value)
    .then(function(data) {
      loadingIcon.classList.add('hidden');
      displayWeather(parseWeather(data));
    })
    .catch(function() {
      loadingIcon.classList.add('hidden');
      alert('Please, enter a valid city.');  // I could do better but I don't want to spend much time on this for now.
    });
}

input.addEventListener('keydown', function(event) {
  if(event.key === 'Enter') {
    getWeather();
  }
});

const toFahrenheit = function(number) {
  return Math.round((1.8*number+32)*100)/100;
}

const toCelsius = function(number) {
  return Math.round(((number-32)/1.8)*100)/100;
}

const changeUnits = function(event) {
  const temperature = document.querySelector('h3');
  if(event.target.value === 'metric') {
    event.target.value = 'imperial';
    event.target.textContent = 'ºF'
    temperature.textContent = `${toFahrenheit(temperature.textContent.slice(0, -2))}ºF`;
  }
  else if(event.target.value === 'imperial') {
    event.target.value = 'metric';
    event.target.textContent = 'ºC';
    temperature.textContent = `${toCelsius(temperature.textContent.slice(0, -2))}ºC`;
  }
}

unit.addEventListener('click', changeUnits);
const button = document.querySelector('button');
button.addEventListener('click', getWeather);
