import { useEffect } from 'react';
import useDispatch from './useDispatch';
import useShowError from './useShowError';
import fetchWeatherData from '../util/fetchWeatherData';
import { Coordinates } from '../../Models/model';

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

    // Api key
    let key = '395853dd6e6712dfd9e8ad5b8ff83856';
    // API URL
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=${key}`;

    //  fetch city and state name
    const res = await fetch(url);
    const resData: Coordinates = await res.json();
    const { country, name } = resData[0];

    // util function to fetch weather data
    const response = await fetchWeatherData(longitude, latitude);

    dispatch({ type: 'fetchData', payLoad: { ...response, country, name } });

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
