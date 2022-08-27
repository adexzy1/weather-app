import style from './alert.module.css';

interface Props {
  error: string | undefined;
}

const Alert = ({ error }: Props) => {
  return (
    <div className={`${style.error} ${error && style.show}`}>
      <p>{error}</p>
    </div>
  );
};

export default Alert;
