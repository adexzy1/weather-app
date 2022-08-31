const fetchWeatherData = async (
  key: string,
  longitude: number | undefined,
  latitude: number | undefined
) => {
  const controller = new AbortController();

  try {
    const weatherDataApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    const timeZoneAPi = `http://api.timezonedb.com/v2.1/get-time-zone?key=ICTVL85OSSC1&format=json&by=position&lat=${latitude}&lng=${longitude}`;

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
