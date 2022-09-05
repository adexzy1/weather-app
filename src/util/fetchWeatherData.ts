const fetchWeatherData = async (
  longitude: number | undefined,
  latitude: number | undefined
) => {
  const controller = new AbortController();
  // openwether map api key
  let key = '395853dd6e6712dfd9e8ad5b8ff83856';

  try {
    const weatherDataApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily,minutely,alerts&appid=${key}`;

    // fetch weather data
    const weatherResponse = await fetch(weatherDataApi, {
      signal: controller.signal,
    });
    const weatherData = await weatherResponse.json();

    return weatherData;
  } catch (err) {
    return err;
  }
};

export default fetchWeatherData;
