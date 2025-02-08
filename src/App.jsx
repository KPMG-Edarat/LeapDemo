import { useState } from 'react';
import Agentic from './components/mainpage';
import Homepage from './components/homepage';
import LeapAI from './components/Leap';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = (page) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      {currentPage === 'home' && <Homepage onNavigate={navigate} />}
      {currentPage === 'leap' && <LeapAI onNavigate={navigate} />}
      {currentPage === 'agentic' && <Agentic onNavigate={navigate} />}
    </>
  );
}

export default App;
