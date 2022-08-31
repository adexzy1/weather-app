import { useEffect, useState } from 'react';
import { WeatherData } from '../../../Models/model';
import Alert from '../../components/alert/Alert';
import Clock from '../../components/clock/Clock';
import Header from '../../components/Header/Header';
import Weather from '../../components/weather/Weather';
import useFetchWeatherOnClick from '../../hooks/useFetchWeatherOnClick';
import fetchWeatherData from '../../util/fetchWeatherData';
import showError from '../../util/showError';
import style from './home.module.css';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({ setIsLoading }: Props) => {
  const [data, setData] = useState<WeatherData>();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // custom hook
  const { fetchCoordinates } = useFetchWeatherOnClick(setIsLoading);

  useEffect(() => {
    // function to check if browser allows geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
      });
    } else {
      alert('Your browser does not support geolocation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // callback funtion if geolocation is available
  async function onSuccess(data: GeolocationPosition) {
    const { longitude, latitude } = data.coords;
    const key = '395853dd6e6712dfd9e8ad5b8ff83856';
    const response = await fetchWeatherData(key, longitude, latitude);

    setData(response);

    // set loading to false after 1sec and request is successful
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setData((prev) => (response ? response : prev));
  }

  // callback funtion if geaolocation if an error occured
  function onError(error: GeolocationPositionError) {
    // remove the loading screen
    setIsLoading(false);

    // function to show error alert
    showError(error.message, setError);

    return;
  }

  // function to fetch data when a city is searched
  const handleFetch = async (
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (searchTerm) {
      const response = await fetchCoordinates(searchTerm!);

      if (typeof response === 'object') {
        // clear input box
        setSearchTerm(' ');

        // hide search box
        setShowSearch(false);

        setData((prev) => (response ? response : prev));

        // set loading to false after 1sec and request is successful
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        showError(response, setError);
      }
    }
  };

  return (
    <div className={style.container}>
      <Alert error={error} />
      <Header
        handleFetch={handleFetch}
        data={data!}
        setShowSearch={setShowSearch}
        showSearch={showSearch}
      />
      <Clock data={data} />
      <Weather data={data!} />
    </div>
  );
};

export default Home;
