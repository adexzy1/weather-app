import { WeatherData } from '../../Models/model';

const setTime = (data: WeatherData) => {
  const zone = data?.zoneName;

  const time = new Date().toLocaleTimeString('en-US', {
    timeZone: zone,
  });

  if (time.length > 10) {
    const seconds = Number(time.slice(6, 8));
    const minutes = Number(time.slice(3, 5));
    const hour = Number(time.slice(0, 2));

    return { seconds, minutes, hour };
  } else {
    const seconds = Number(time.slice(5, 7));
    const minutes = Number(time.slice(2, 4));
    const hour = Number(time.slice(0, 1));

    return { seconds, minutes, hour };
  }
};

export default setTime;
