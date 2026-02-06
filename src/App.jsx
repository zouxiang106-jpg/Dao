import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import DivinationPage from './components/DivinationPage';
import ResultPage from './components/ResultPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const goToDivination = () => {
    setCurrentPage('divination');
  };

  const goToResult = () => {
    setCurrentPage('result');
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onNext={goToDivination} />}
      {currentPage === 'divination' && <DivinationPage onComplete={goToResult} />}
      {currentPage === 'result' && <ResultPage />}
    </div>
  );
}

export default App;
