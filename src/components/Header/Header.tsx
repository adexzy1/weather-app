import { FiSearch } from 'react-icons/fi';
import { WeatherData } from '../../../Models/model';
import Search from '../search/Search';
import style from './header.module.css';

interface Props {
  handleFetch: (
    e: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  data: WeatherData;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showSearch: boolean;
}

const Header = ({ handleFetch, data, setShowSearch, showSearch }: Props) => {
  const handleClick = () => {
    setShowSearch((prev) => !prev);
  };

  const cityName = data?.zoneName.split('/')[1];

  return (
    <div className={style.header_container}>
      <p className={style.city}>{cityName ? cityName : 'City'}</p>
      <div className={style.icon_wrapper} onClick={handleClick}>
        <FiSearch />
      </div>

      <Search
        handleCilck={handleClick}
        showSearch={showSearch}
        handleFetch={handleFetch}
      />
    </div>
  );
};

export default Header;
