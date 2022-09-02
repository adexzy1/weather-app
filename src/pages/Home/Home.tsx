import Alert from '../../components/alert/Alert';
import Clock from '../../components/clock/Clock';
import Header from '../../components/Header/Header';
import Weather from '../../components/weather/Weather';
import style from './home.module.css';
import useFetchWeatherDataOnLoad from '../../hooks/useFetchWeatherDataOnload';

const Home = () => {
  // function to fetch weather data when component mounts
  useFetchWeatherDataOnLoad();

  return (
    <div className={style.container}>
      <Alert />
      <Header />
      <Clock />
      <Weather />
    </div>
  );
};

export default Home;
