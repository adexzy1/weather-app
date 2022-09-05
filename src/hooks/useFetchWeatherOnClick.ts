import { Coordinates } from '../../Models/model';
import fetchWeatherData from '../util/fetchWeatherData';
import useDispatch from './useDispatch';
import useShowError from './useShowError';

// type declearations
type InputRef = React.RefObject<HTMLInputElement>;

const useFetchWeatherOnClick = (inputRef: InputRef) => {
  // custom hook to set global state value
  const dispatch = useDispatch();
  // custom error hook to show error alert
  const { showError } = useShowError();

  // function to fetah
  const fetchWeatherDataOnClick = async () => {
    // openwether map api key
    let key = '395853dd6e6712dfd9e8ad5b8ff83856';

    // API url to get coordinates
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current?.value}&limit=1&appid=${key}`;

    // set loading to true when form is submitted
    dispatch({ type: 'isLoading', payLoad: true });

    try {
      const response = await fetch(url);
      const coordinates = await response.json();
      if (coordinates.length > 0) {
        // fetch data
        fetchData(coordinates);
      } else {
        // function to show error alert
        showError(`${inputRef.current?.value} is not a valid City`);
        // remove loading screen
        dispatch({ type: 'isLoading', payLoad: false });
      }
    } catch (error: any) {
      showError(error.message);
      dispatch({ type: 'isLoading', payLoad: false });
    }
  };

  // function to fetch weather data from Api
  async function fetchData(coordinates: Coordinates) {
    const { lat, lon, country, name } = coordinates[0];

    // util function to fetch weather data by longitude and latitude
    const data = await fetchWeatherData(lon, lat);

    // clear input box
    inputRef.current!.value = '';
    // hide search box
    dispatch({ type: 'showSearchBox', payLoad: false });
    // save fetched data in the global state
    dispatch({ type: 'fetchData', payLoad: { ...data, country, name } });
    // remove loading screen after 1sec if request is successful
    setTimeout(() => {
      dispatch({ type: 'isLoading', payLoad: false });
    }, 1000);
  }

  return { fetchWeatherDataOnClick };
};

export default useFetchWeatherOnClick;
