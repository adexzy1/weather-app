import { useEffect, useState } from 'react';
import { WeatherData } from '../../../Models/model';
import clockFace from '../../assets/clock-face-r.png';
import style from './clock.module.css';
import setTime from '../../util/setTime';
import useSelector from '../../hooks/useSelector';

const Clock = () => {
  // local state
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);

  // custom hook for global state (react-context)
  const data: WeatherData = useSelector((state) => state.data);

  useEffect(() => {
    const timeInterval = 6;

    const Interval = setInterval(() => {
      if (data) {
        const { hour, seconds, minutes } = setTime(data);

        setSeconds(seconds * timeInterval);
        setMinutes(minutes * timeInterval + seconds / 10);
        setHour(hour * 30 + minutes / 2);
      }
    }, 1000);

    return () => clearInterval(Interval);
  }, [data]);

  return (
    <div className={style.clock_wrapper}>
      <img src={clockFace} alt="" />
      <div
        className={style.hour_hand}
        style={{ transform: `rotate(${hour}deg)` }}
      ></div>
      <div
        className={style.minutes_hand}
        style={{ transform: `rotate(${minutes}deg)` }}
      ></div>
      <div
        className={style.seconds_hand}
        style={{ transform: `rotate(${seconds}deg)` }}
      ></div>
      <div className={style.middle_dot}></div>
    </div>
  );
};

export default Clock;
