import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LetterPage from './pages/LetterPage';
import ReasonsPage from './pages/ReasonsPage';
import PromisesPage from './pages/PromisesPage';
import ForeverPage from './pages/ForeverPage';
import RoseDay from './pages/RoseDay';
import ProposeDay from './pages/ProposeDay';
import ChocolateDay from './pages/ChocolateDay';
import TeddyDay from './pages/TeddyDay';
import PromiseDay from './pages/PromiseDay';
import HugDay from './pages/HugDay';
import KissDay from './pages/KissDay';
import ValentineDay from './pages/ValentineDay';
import MemoriesPage from './pages/MemoriesPage';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/reasons" element={<ReasonsPage />} />
          <Route path="/promises" element={<PromisesPage />} />
          <Route path="/forever" element={<ForeverPage />} />
          <Route path="/rose-day" element={<RoseDay />} />
          <Route path="/propose-day" element={<ProposeDay />} />
          <Route path="/chocolate-day" element={<ChocolateDay />} />
          <Route path="/teddy-day" element={<TeddyDay />} />
          <Route path="/promise-day" element={<PromiseDay />} />
          <Route path="/hug-day" element={<HugDay />} />
          <Route path="/kiss-day" element={<KissDay />} />
          <Route path="/valentine-day" element={<ValentineDay />} />
          <Route path="/memories" element={<MemoriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
