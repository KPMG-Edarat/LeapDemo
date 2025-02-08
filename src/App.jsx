import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Agentic from './components/mainpage';
import Homepage from './components/homepage';
import LeapAI from './components/Leap';
import LoadingScreen from './components/LoadingScreen';

// Create a wrapper component to handle loading states
const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show loading screen on route change
    setIsLoading(true);
    
    // Simulate loading time - changed from 1500 to 500ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5 seconds loading time

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <LoadingWrapper>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/leap" element={<LeapAI />} />
          <Route path="/agentic" element={<Agentic />} />
        </Routes>
      </LoadingWrapper>
    </Router>
  );
}

export default App;
