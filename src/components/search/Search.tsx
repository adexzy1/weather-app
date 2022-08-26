import { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import style from './search.module.css';

interface Props {
  handleCilck: () => void;
  showSearch: boolean;
  handleFetch: (e: string | undefined) => void;
}

const Search = ({ handleCilck, showSearch, handleFetch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  return (
    <div className={`${style.input_wrapper} ${showSearch && style.show}`}>
      <div className={style.icon_wrapper} onClick={handleCilck}>
        <MdCancel />
      </div>
      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleFetch(searchTerm)}>Get Weather Info</button>
    </div>
  );
};

export default Search;
