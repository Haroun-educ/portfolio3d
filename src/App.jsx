import { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Initialize state from localStorage or use defaults
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en'; // 'en' for English, 'fr' for French
  });

  // Apply dark mode class to html element and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <Router>
      <div className="relative z-0 bg-primary dark:bg-slate-900 text-white">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
        />

        <AnimatePresence mode="wait">
          <Home language={language} />
        </AnimatePresence>

        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;
