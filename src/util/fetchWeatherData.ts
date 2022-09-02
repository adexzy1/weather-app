const fetchWeatherData = async (
  longitude: number | undefined,
  latitude: number | undefined
) => {
  const controller = new AbortController();
  // openwether map api key
  let key = '395853dd6e6712dfd9e8ad5b8ff83856';

  try {
    const weatherDataApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    const timeZoneAPi = `https://api.timezonedb.com/v2.1/get-time-zone?key=ICTVL85OSSC1&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    // fetch time zone
    const timezoneResponse = await fetch(timeZoneAPi, {
      signal: controller.signal,
    });
    const timeZoneData = await timezoneResponse.json();

    // fetch weather data
    const weatherResponse = await fetch(weatherDataApi, {
      signal: controller.signal,
    });
    const weatherData = await weatherResponse.json();

    // spread both weather and timezone data into a single object
    const data = { ...weatherData, ...timeZoneData };

    return data;
  } catch (err) {
    return err;
  }
};

export default fetchWeatherData;
