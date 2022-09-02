import { ACTIONTYPE, InitialState } from '../../Models/model';

const reducer = (state: InitialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'fetchData':
      return {
        ...state,
        data: action.payLoad,
      };

    case 'showSearchBox':
      return {
        ...state,
        showSearchBox: action.payLoad,
      };
    case 'error':
      return {
        ...state,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export default reducer;
