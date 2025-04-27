import { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'fr' for French

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
