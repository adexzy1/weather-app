import { useEffect, useState } from 'react';
import clockFace from '../../assets/clock-face-r.png';
import style from './clock.module.css';
const Clock = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);

  useEffect(() => {
    const timeInterval = 6;
    const setTime = () => {
      const date = new Date();
      const seconds = date.getSeconds();
      const minutes = date.getMinutes();
      const hour = date.getHours();

      setSeconds(seconds * timeInterval);
      setMinutes(minutes * timeInterval + seconds / 10);
      setHour(hour * 30 + minutes / 2);
    };
    setInterval(setTime, 1000);
  }, [seconds]);

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
