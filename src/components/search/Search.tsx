import { useRef } from 'react';
import { MdCancel } from 'react-icons/md';
import useDispatch from '../../hooks/useDispatch';
import useFetchWeatherOnClick from '../../hooks/useFetchWeatherOnClick';
import useSelector from '../../hooks/useSelector';
import style from './search.module.css';

const Search = () => {
  // input-box ref
  const inputRef = useRef<HTMLInputElement>(null);

  // custom hook to fetch data from API
  const { fetchWeatherDataOnClick } = useFetchWeatherOnClick(inputRef);

  // custom Hooks form global state
  const showSearchBox: boolean = useSelector((state) => state.showSearchBox);
  const dispatch = useDispatch();

  // fuction to handle cancel btn
  const handleHideSearchBox = () => {
    dispatch({ type: 'showSearchBox', payLoad: false });
  };

  // function to fetch data when a city is searched
  const handleFetch = async () => {
    if (inputRef.current?.value) {
      fetchWeatherDataOnClick();
    }
  };

  return (
    <div className={`${style.input_wrapper} ${showSearchBox && style.show}`}>
      <div className={style.icon_wrapper} onClick={handleHideSearchBox}>
        <MdCancel />
      </div>

      <input ref={inputRef} name="city" type="text" placeholder="Enter city" />
      <button onClick={handleFetch}>Get Weather Info</button>
    </div>
  );
};

export default Search;
