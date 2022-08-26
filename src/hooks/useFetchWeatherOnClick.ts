const useFechWeatherOnClick = () => {
  const controller = new AbortController();

  const fethWetherData = async (state: string, country: string) => {
    let key = '395853dd6e6712dfd9e8ad5b8ff83856';

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${state},${country}&limit=5&appid=${key}`;

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });

      const data = await response.json();

      const latitude = data[0].lat;
      const longitude = data[0].lon;

      const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

      const weatherResponse = await fetch(weatherDataUrl, {
        signal: controller.signal,
      });

      const weatherData = await weatherResponse.json();

      return weatherData;
    } catch (err) {
      console.log(err);
    }
  };

  return { fethWetherData };
};

export default useFechWeatherOnClick;
