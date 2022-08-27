const fetchWeatherData = async (
  key: string,
  longitude: number | undefined,
  latitude: number | undefined
) => {
  const controller = new AbortController();

  try {
    const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    const weatherResponse = await fetch(weatherDataUrl, {
      signal: controller.signal,
    });

    const weatherData = await weatherResponse.json();

    return weatherData;
  } catch (err) {
    return err;
  }
};

export default fetchWeatherData;
