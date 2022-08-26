import { IoMdCloudy } from 'react-icons/io';
import { WeatherData } from '../../../Models/model';
import style from './weather.module.css';

interface Props {
  data: WeatherData;
}

const Weather = ({ data }: Props) => {
  // convert weather degreee data from kelvin to fahrenheit
  const fahrenheit = Math.floor((data?.main.temp - 273.15) * 1.8 + 32);

  return (
    <div className={style.weather_container}>
      <div className={style.weather_wrapper}>
        <h2 className={style.weather_degree}>
          {fahrenheit}
          <sup>
            <span>0</span>F
          </sup>
        </h2>

        <div className={style.weather_details}>
          <h3>{data?.name}</h3>
          <div>
            <span>06:09-</span>
            <span>Monday, 9 Sep'19</span>
          </div>
        </div>

        <div className={style.weather_info}>
          <IoMdCloudy />
          <p>{data?.weather[0].main}</p>
        </div>
      </div>

      <div className={style.weather_more_details}>
        <h5>Weather Details</h5>

        <div>
          <p>Cloudy</p>
          <p>{data?.clouds.all}%</p>
        </div>

        <div>
          <p>Humidity</p>
          <p>{data?.main.humidity}%</p>
        </div>

        <div>
          <p>Wind</p>
          <p>{data?.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
