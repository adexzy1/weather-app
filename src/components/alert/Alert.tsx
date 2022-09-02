import useSelector from '../../hooks/useSelector';
import style from './alert.module.css';

const Alert = () => {
  const error = useSelector((state) => state.error);
  return (
    <div className={`${style.error} ${error && style.show}`}>
      <p>{error}</p>
    </div>
  );
};

export default Alert;
