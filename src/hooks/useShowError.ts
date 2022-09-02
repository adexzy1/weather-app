import useDispatch from './useDispatch';

const useShowError = () => {
  // custom hook to dispatch reducer actions
  const dispatch = useDispatch();

  const showError = (error: string) => {
    dispatch({ type: 'error', payLoad: error });

    setTimeout(() => {
      dispatch({ type: 'error', payLoad: '' });
    }, 2000);
  };

  return { showError };
};

export default useShowError;
