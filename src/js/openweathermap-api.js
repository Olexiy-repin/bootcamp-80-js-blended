export function getCityCoordinates(cityName) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=95632b02f9162f375a368971925f5209`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

export function getWeatherByCityName(latitude, longitude) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=95632b02f9162f375a368971925f5209&units=metric`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
