import { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import style from './search.module.css';

interface Props {
  handleFetch: (
    e: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

const Search = ({ handleFetch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // custom Hooks
  const showSearchBox: boolean = useSelector((state) => state.showSearchBox);
  const dispatch = useDispatch();

  const handleHideSearchBox = () => {
    dispatch({ type: 'showSearchBox', payLoad: false });
  };

  return (
    <div className={`${style.input_wrapper} ${showSearchBox && style.show}`}>
      <div className={style.icon_wrapper} onClick={handleHideSearchBox}>
        <MdCancel />
      </div>

      <input
        name="city"
        type="text"
        placeholder="Enter city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleFetch(searchTerm, setSearchTerm)}>
        Get Weather Info
      </button>
    </div>
  );
};

export default Search;
