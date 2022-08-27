import fetchWeatherData from '../util/fetchWeatherData';

type SetIsLoading = React.Dispatch<React.SetStateAction<boolean>>;

const useFetchWeatherOnClick = (setIsloading: SetIsLoading) => {
  const controller = new AbortController();
  let key = '395853dd6e6712dfd9e8ad5b8ff83856';

  const fetchCoordinates = async (state: string, country: string) => {
    // set loadin to true when form is submitted
    setIsloading(true);
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${state},${country}&limit=5&appid=${key}`;

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });

      const corordinates = await response.json();

      if (corordinates.length > 0) {
        const latitude = corordinates[0].lat;
        const longitude = corordinates[0].lon;

        const data = await fetchWeatherData(key, longitude, latitude);

        // set loading to false after 1sec and request is successful
        setTimeout(() => {
          setIsloading(false);
        }, 1000);

        return data;
      } else {
        return 'City not found, please enter a different City';
      }
    } catch (error) {
      return error;
    }
  };

  return { fetchCoordinates };
};

export default useFetchWeatherOnClick;
