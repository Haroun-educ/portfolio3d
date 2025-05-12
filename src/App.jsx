import { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Loading component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-blue-300 text-lg">Loading...</p>
    </motion.div>
  </div>
);

function App() {
  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  // Initialize state from localStorage or use defaults
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode !== null ? JSON.parse(savedMode) : true;
    } catch (error) {
      console.error('Error reading darkMode from localStorage:', error);
      return true;
    }
  });

  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage || 'en'; // 'en' for English, 'fr' for French
    } catch (error) {
      console.error('Error reading language from localStorage:', error);
      return 'en';
    }
  });

  // Apply dark mode class to html element and save to localStorage
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error setting darkMode:', error);
    }
  }, [darkMode]);

  // Save language preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, [language]);

  // Simulate loading and handle initial setup
  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      try {
        // Wait a bit to ensure everything is loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error during preloading:', error);
        setIsLoading(false); // Still set loading to false to not block the UI
      }
    };

    preloadResources();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="relative z-0 bg-primary dark:bg-slate-900 text-white">
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            language={language}
            setLanguage={setLanguage}
          />

          <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait">
              <Home language={language} />
            </AnimatePresence>
          </Suspense>

          <Footer language={language} />
        </div>
      )}
    </Router>
  );
}

export default App;
