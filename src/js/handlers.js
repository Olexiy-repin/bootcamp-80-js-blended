import { createWeatherCardTemplate } from './render-functions';
import { getCityCoordinates, getWeatherByCityName } from './openweathermap-api';
import { refs } from './refs';

export async function onFormSubmit(event) {
  try {
    event.preventDefault();

    const cityName = event.target.elements.user_country.value.trim();

    if (!cityName) {
      return alert('Заповніть поле пошуку!');
    }

    const cityCoordinatesArr = await getCityCoordinates(cityName);

    if (cityCoordinatesArr.length === 0) {
      return alert('Міста не знайдено!');
    }

    const { lat, lon } = cityCoordinatesArr[0];

    const weatherInfo = await getWeatherByCityName(lat, lon);

    const weatherCardTemplate = createWeatherCardTemplate(weatherInfo);

    refs.weatherContainer.innerHTML = weatherCardTemplate;
  } catch (error) {
    console.log(error);
  }
}
