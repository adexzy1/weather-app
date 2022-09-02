import { FiSearch } from 'react-icons/fi';
import { WeatherData } from '../../../Models/model';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import Search from '../search/Search';
import style from './header.module.css';

interface Props {
  handleFetch: (
    e: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showSearch: boolean;
}

const Header = ({ handleFetch, setShowSearch, showSearch }: Props) => {
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

      <Search handleFetch={handleFetch} />
    </div>
  );
};

export default Header;
