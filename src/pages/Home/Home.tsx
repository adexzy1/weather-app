import { useEffect, useState } from 'react';
import { WeatherData } from '../../../Models/model';
import Clock from '../../components/clock/Clock';
import Header from '../../components/Header/Header';
import Weather from '../../components/weather/Weather';
import useFechWeatherOnClick from '../../hooks/useFetchWeatherOnClick';
import style from './home.module.css';

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const Home = ({ setIsLoading }: Props) => {
  const [data, setData] = useState<WeatherData>();
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();

  useEffect(() => {
    const controller = new AbortController();
    const key = '395853dd6e6712dfd9e8ad5b8ff83856';

    // get users corordinates
    window.navigator.geolocation.getCurrentPosition((a) => {
      const { latitude, longitude } = a.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });

    const fethWetherData = async () => {
      setIsLoading(true);
      try {
        const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

        const weatherResponse = await fetch(weatherDataUrl, {
          signal: controller.signal,
        });

        const weatherData = await weatherResponse.json();

        setData(weatherData);

        console.log(weatherData);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.log(err);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    if (latitude && longitude) {
      fethWetherData();
    }

    return () => controller.abort();
  }, [latitude, longitude, setIsLoading]);
  // custom hook
  const { fethWetherData } = useFechWeatherOnClick();

  const handleFetch = async (searchTerm: string | undefined) => {
    if (searchTerm) {
      const response = await fethWetherData(searchTerm!, 'NG');
      // console.log(response);
    }
  };
  return (
    <div className={style.container}>
      <Header handleFetch={handleFetch} data={data!} />
      <Clock />
      <Weather data={data!} />
    </div>
  );
};

export default Home;
