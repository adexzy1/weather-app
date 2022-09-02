import { useContext } from 'react';
import { InitialState } from '../../Models/model';
import AppContext from '../context/AppContext';

type Callback = (state: InitialState) => any;

const useSelector = (callBack: Callback): ReturnType<typeof callBack> => {
  const { state } = useContext(AppContext);
  const stateValue = callBack(state);

  return stateValue;
};

export default useSelector;
