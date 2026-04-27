import { createWeatherCardTemplate } from './render-functions';
import { getCityCoordinates, getWeatherByCityName } from './openweathermap-api';
import { refs } from './refs';

export function onFormSubmit(event) {
  event.preventDefault();

  const cityName = event.target.elements.user_country.value.trim();

  if (!cityName) {
    return alert('Заповніть поле пошуку!');
  }

  getCityCoordinates(cityName)
    .then(data => {
      if (data.length === 0) {
        return alert('Міста не знайдено!');
      }

      const { lat, lon } = data[0];

      return getWeatherByCityName(lat, lon);
    })
    .then(data => {
      const weatherCardTemplate = createWeatherCardTemplate(data);

      refs.weatherContainer.innerHTML = weatherCardTemplate;
    })
    .catch(err => console.log(err));
}
