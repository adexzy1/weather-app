import { FiSearch } from 'react-icons/fi';
import { WeatherData } from '../../../Models/model';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import Search from '../search/Search';
import style from './header.module.css';

const Header = () => {
  // cutom hook for to get data from global context
  const data: WeatherData = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleShowSearchBox = () => {
    dispatch({ type: 'showSearchBox', payLoad: true });
  };

  const cityName = data?.zoneName.split('/')[1];

  return (
    <div className={style.header_container}>
      <p className={style.city}>{cityName ? cityName : 'City'}</p>
      <div className={style.icon_wrapper} onClick={handleShowSearchBox}>
        <FiSearch />
      </div>

      <Search />
    </div>
  );
};

export default Header;
