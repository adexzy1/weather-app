import { useEffect, useState } from 'react';
import { WeatherData } from '../../../Models/model';
import Clock from '../../components/clock/Clock';
import Header from '../../components/Header/Header';
import Weather from '../../components/weather/Weather';
import useFetchWeatherOnClick from '../../hooks/useFetchWeatherOnClick';
import fetchWeatherData from '../../util/fetchWeatherData';
import style from './home.module.css';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home = ({ setIsLoading }: Props) => {
  const [data, setData] = useState<WeatherData>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [latitude, setLatitude] = useState<number>();
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // cunstom hook

  useEffect(() => {
    const key = '395853dd6e6712dfd9e8ad5b8ff83856';

    // get users corordinates
    window.navigator.geolocation.getCurrentPosition((a) => {
      const { latitude, longitude } = a.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });

    const fetchData = async () => {
      const response = await fetchWeatherData(key, longitude, latitude);

      setData(response);

      // set loading to false after 1sec and request is successful
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setData((prev) => (response ? response : prev));
    };

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude, setIsLoading]);

  // custom hook
  const { fetchCoordinates } = useFetchWeatherOnClick(setIsLoading);

  const handleFetch = async (searchTerm: string | undefined) => {
    if (searchTerm) {
      const response = await fetchCoordinates(searchTerm!, 'NG');

      // hide search box
      setShowSearch(false);

      // set loading to false after 1sec and request is successful
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setData((prev) => (response ? response : prev));
    }
  };

  return (
    <div className={style.container}>
      <Header
        handleFetch={handleFetch}
        data={data!}
        setShowSearch={setShowSearch}
        showSearch={showSearch}
      />
      <Clock />
      <Weather data={data!} />
    </div>
  );
};

export default Home;
