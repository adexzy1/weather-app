import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { WeatherData } from '../../../Models/model';
import Search from '../search/Search';
import style from './header.module.css';

interface Props {
  handleFetch: (e: string | undefined) => void;
  data: WeatherData;
}

const Header = ({ handleFetch, data }: Props) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleClick = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <div className={style.header_container}>
      <p className={style.city}>{data?.name}</p>
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
