import style from './welcomePage.module.css';
import { gsap, Power3 } from 'gsap';
import { useEffect } from 'react';

interface Props {
  isLoading: boolean;
}

const WelcomePage = ({ isLoading }: Props) => {
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: Power3.easeInOut,
        duration: 2,
      },
    });

    tl.to('p > span', { duration: 2, opacity: 1, stagger: 0.2, y: '0%' });
  }, []);

  return (
    <main className={`${style.container} ${!isLoading && style.hide}`}>
      <p className={style.welcome_text}>
        <span>
          <strong className={style.color_text}>x</strong>
          <span>Weather</span>
        </span>
      </p>
      <p className={style.tagline}>
        <span>Check you weather Today!</span>
      </p>
    </main>
  );
};

export default WelcomePage;
