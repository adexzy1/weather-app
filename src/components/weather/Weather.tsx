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

  const cityName = data?.zoneName.split('/')[1];
  const icon = data ? (
    <img
      src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
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

        <div className={style.weather_details}>
          <h3>{cityName ? cityName : 'City'}</h3>
          <div>
            <span>{date}</span>
          </div>
        </div>

        <div className={style.weather_info}>
          {icon}
          <p>
            {data?.weather[0].description
              ? data.weather[0].description
              : 'scattered clouds '}
          </p>
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
