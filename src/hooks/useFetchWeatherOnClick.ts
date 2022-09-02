import fetchWeatherData from '../util/fetchWeatherData';
import useDispatch from './useDispatch';
import useShowError from './useShowError';

const useFetchWeatherOnClick = () => {
  // custom hook to set global state value
  const dispatch = useDispatch();

  // custom error hook to show error alert
  const { showError } = useShowError();

  const controller = new AbortController();
  // openwether map api key
  let key = '395853dd6e6712dfd9e8ad5b8ff83856';

  const fetchCoordinates = async (
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    // set loading to true when form is submitted
    dispatch({ type: 'isLoading', payLoad: true });

    // API url to get coordinates
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current?.value}&limit=5&appid=${key}`;

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });

      const corordinates = await response.json();

      if (corordinates.length > 0) {
        const latitude = corordinates[0].lat;
        const longitude = corordinates[0].lon;

        // util function to fetch weather data by longitude and latitude
        const data = await fetchWeatherData(longitude, latitude);

        // show loading screen
        setTimeout(() => {
          dispatch({ type: 'isLoading', payLoad: true });
        }, 1000);

        if (typeof data === 'object') {
          // clear input box
          inputRef.current!.value = '';

          // hide search box
          dispatch({ type: 'showSearchBox', payLoad: false });

          // save fetched data in the global state
          dispatch({ type: 'fetchData', payLoad: data });

          // remove loading screen after 1sec if request is successful
          setTimeout(() => {
            dispatch({ type: 'isLoading', payLoad: false });
          }, 1000);
        } else {
          // remove loading screen after 1sec if request  fails
          setTimeout(() => {
            dispatch({ type: 'isLoading', payLoad: false });
          }, 1000);

          // function to show error alert
          showError(data);
        }
      } else {
        // function to show error alert
        showError(`${inputRef.current?.value} is not a valid City`);
        dispatch({ type: 'isLoading', payLoad: false });
      }
    } catch (error: any) {
      showError(error.message);
      dispatch({ type: 'isLoading', payLoad: false });
    }
  };

  return { fetchCoordinates };
};

export default useFetchWeatherOnClick;
