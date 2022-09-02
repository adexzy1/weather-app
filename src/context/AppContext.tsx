import { createContext, Dispatch, ReactElement, useReducer } from 'react';
import { ACTIONTYPE, InitialState } from '../../Models/model';
import reducer from '../reducers/AppReducer';

interface Props {
  children: ReactElement;
}

const initialState: InitialState = {
  data: null,
  showSearchBox: false,
  error: '',
  isLoading: true,
};

const AppContext = createContext<{
  state: InitialState;
  dispatch: Dispatch<ACTIONTYPE>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
