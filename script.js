const apiKey = '7ed88653742e40a1843194520232611';

// Getting the DOM Elements
const input = document.querySelector('input');
const button = document.querySelector('button');
const placeLocation = document.querySelector('.location');
const dateTime = document.querySelector('.date-time');
const condition = document.querySelector('.condition');
const conditionImg = document.querySelector('.condition-img');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const section = document.querySelector('section');

async function getWeatherInfor(location) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}`;
  try {
    const response = await fetch(url);
    if (response.status === 400) {
      throw new Error(`Bad request: "${location}" not found!`);
    }
    const responseData = await response.json();
    let cleanData = convertWeatherData(responseData);
    updateScreen(cleanData);
    section.classList.remove('hidden');
  } catch (error) {
    alert(error);
  }
}

function convertWeatherData(data) {
  const weatherData = {
    locationCountry: `${data.location.name}, ${data.location.country}`,
    dateTime: data.current.last_updated,
    weatherCondition: data.current.condition.text,
    weatherConditionIcon: data.current.condition.icon,
    temperature: data.current.feelslike_c,
    humidity: data.current.humidity,
  };
  console.log(weatherData);
  return weatherData;
}

function updateScreen(data) {
  placeLocation.textContent = data.locationCountry;
  dateTime.textContent = data.dateTime;
  condition.textContent = data.weatherCondition;
  temperature.textContent = `Temp: ${data.temperature}`;
  humidity.textContent = `Humidity: ${data.humidity}`;
  conditionImg.src = data.weatherConditionIcon;
}

button.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value == '') return;
  getWeatherInfor(input.value);
  input.value = '';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (input.value == '') return;
    getWeatherInfor(input.value);
    input.value = '';
  }
});
