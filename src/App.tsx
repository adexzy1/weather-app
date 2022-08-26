import { useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import WelcomePage from './pages/welcome-page/WelcomePage';

function App() {
  const [isLoading, setIsloading] = useState<boolean>(true);

  return (
    <div className="App">
      <WelcomePage isLoading={isLoading} />
      <Home setIsLoading={setIsloading} />
    </div>
  );
}

export default App;
