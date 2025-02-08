import React from 'react';
import kpmgLogo from '../assets/kpmg.svg';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0A192F] to-[#162B4D] flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img 
          src={kpmgLogo} 
          alt="KPMG Logo" 
          className="h-16 mb-8 animate-pulse"
          style={{ filter: 'brightness(0) invert(1)' }}  // Make logo white
        />
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 