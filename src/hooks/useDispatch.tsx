import { useContext } from 'react';
import AppContext from '../context/AppContext';

const useDispatch = () => {
  const { dispatch } = useContext(AppContext);

  return dispatch;
};

export default useDispatch;
