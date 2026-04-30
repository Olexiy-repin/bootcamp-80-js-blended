import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org';

export async function getCityCoordinates(cityName) {
  const requestParams = {
    q: cityName,
    limit: '1',
    appid: '95632b02f9162f375a368971925f5209',
  };

  const { data } = await axios.get('/geo/1.0/direct', { params: requestParams });

  return data;
}

export async function getWeatherByCityName(latitude, longitude) {
  const requestParams = {
    lat: latitude,
    lon: longitude,
    units: 'metric',
    appid: '95632b02f9162f375a368971925f5209',
  };

  const { data } = await axios.get('/data/2.5/weather', { params: requestParams });

  return data;
}
