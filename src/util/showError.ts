type SetError = React.Dispatch<React.SetStateAction<string>>;

const showError = (error: string, setError: SetError) => {
  setError(error);

  setTimeout(() => {
    setError('');
  }, 2000);
};

export default showError;
