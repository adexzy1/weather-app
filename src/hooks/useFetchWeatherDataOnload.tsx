import { useEffect } from 'react';
import useDispatch from './useDispatch';
import useShowError from './useShowError';
import fetchWeatherData from '../util/fetchWeatherData';

const useFetchWeatherDataOnLoad = () => {
  const dispatch = useDispatch();
  const { showError } = useShowError();

  useEffect(() => {
    // function to check if browser allows geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
      });
    } else {
      // show error if browser does not support geolocation
      dispatch({
        type: 'error',
        payLoad: 'Your browser does not support geolocation',
      });
      // remove loading screen
      dispatch({ type: 'isLoading', payLoad: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // callback funtion if geolocation is available
  async function onSuccess(data: GeolocationPosition) {
    const { longitude, latitude } = data.coords;

    // util function to fetch weather data
    const response = await fetchWeatherData(longitude, latitude);

    dispatch({ type: 'fetchData', payLoad: response });

    // set loading to false after 1sec and request is successful
    setTimeout(() => {
      dispatch({ type: 'isLoading', payLoad: false });
    }, 1000);
  }

  // callback funtion  if an error occured
  function onError(error: GeolocationPositionError) {
    // remove loading screen
    dispatch({ type: 'isLoading', payLoad: false });

    // function to show error alert
    showError(error.message);
  }
};

export default useFetchWeatherDataOnLoad;
