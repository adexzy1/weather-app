import { IoMdCloudy } from 'react-icons/io';
import { WeatherData } from '../../../Models/model';
import useSelector from '../../hooks/useSelector';
import style from './weather.module.css';

const Weather = () => {
  // custom hook for global state (react-context)
  const data: WeatherData = useSelector((state) => state.data);

  // convert weather degreee data from kelvin to fahrenheit
  const fahrenheit = Math.floor((data?.current.temp - 273.15) * 1.8 + 32);

  // format the date and time as string
  const date = new Date().toLocaleDateString('en-US', {
    timeZone: data?.timezone,
  });

  const icon = data ? (
    <img
      src={`https://openweathermap.org/img/wn/${data?.current.weather[0].icon}.png`}
      alt="icon"
    />
  ) : (
    <IoMdCloudy />
  );

  return (
    <div className={style.weather_container}>
      <div className={style.weather_wrapper}>
        <h2 className={style.weather_degree}>
          {!isNaN(fahrenheit) ? fahrenheit : 0}
          <sup>
            <span>0</span>F
          </sup>
        </h2>

        <div className={style.weather_details_city}>
          <h3>{data?.country ? data.country : 'Country'}</h3>
          <div>
            <span>{date}</span>
          </div>
        </div>

        <div className={style.weather_description}>
          {icon}
          <p>
            {data?.current.weather[0].description
              ? data.current.weather[0].description
              : 'scattered clouds '}
          </p>
        </div>
      </div>

      <div className={style.weather_more_details}>
        <h5>Weather Details</h5>

        <div>
          <p>Cloudy</p>
          <p>{data?.current.clouds ? data.current.clouds : 0}%</p>
        </div>

        <div>
          <p>Humidity</p>
          <p>{data?.current.humidity ? data.current.humidity : 0}%</p>
        </div>

        <div>
          <p>Wind</p>
          <p>{data?.current.wind_speed ? data.current.wind_speed : 0} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
