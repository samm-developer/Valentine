import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LetterPage from './pages/LetterPage';
import ReasonsPage from './pages/ReasonsPage';
import PromisesPage from './pages/PromisesPage';
import ForeverPage from './pages/ForeverPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/reasons" element={<ReasonsPage />} />
          <Route path="/promises" element={<PromisesPage />} />
          <Route path="/forever" element={<ForeverPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
