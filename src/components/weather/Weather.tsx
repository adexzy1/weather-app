import { IoMdCloudy } from 'react-icons/io';
import { WeatherData } from '../../../Models/model';
import style from './weather.module.css';

interface Props {
  data: WeatherData;
}

const Weather = ({ data }: Props) => {
  // convert weather degreee data from kelvin to fahrenheit
  const fahrenheit = Math.floor((data?.main.temp - 273.15) * 1.8 + 32);

  // format the date and time as string
  const date = new Date().toLocaleDateString('en-US', {
    timeZone: data?.zoneName,
  });

  return (
    <div className={style.weather_container}>
      <div className={style.weather_wrapper}>
        <h2 className={style.weather_degree}>
          {!isNaN(fahrenheit) ? fahrenheit : 0}
          <sup>
            <span>0</span>F
          </sup>
        </h2>

        <div className={style.weather_details}>
          <h3>{data?.name ? data.name : 'City'}</h3>
          <div>
            <span>{date}</span>
          </div>
        </div>

        <div className={style.weather_info}>
          <IoMdCloudy />
          <p>{data?.weather[0].main ? data.weather[0].main : 'cloudy'}</p>
        </div>
      </div>

      <div className={style.weather_more_details}>
        <h5>Weather Details</h5>

        <div>
          <p>Cloudy</p>
          <p>{data?.clouds.all ? data.clouds.all : 0}%</p>
        </div>

        <div>
          <p>Humidity</p>
          <p>{data?.main.humidity ? data.main.humidity : 0}%</p>
        </div>

        <div>
          <p>Wind</p>
          <p>{data?.wind.speed ? data.wind.speed : 0} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
