import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Language content
const content = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    achievements: "Achievements",
    contact: "Contact"
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    achievements: "Réalisations",
    contact: "Contact"
  }
};

const Navbar = ({ darkMode, setDarkMode, language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Text content based on selected language
  const t = content[language];

  // Handle scroll event to change navbar appearance and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['contact', 'achievements', 'projects', 'skills', 'about', 'home'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary/80 dark:bg-slate-900/80 backdrop-blur-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Mohamed Haroun
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className={`nav-link transition-colors duration-300 ${activeSection === 'home' ? 'text-blue-500 font-medium' : 'text-gray-300 hover:text-white'}`}
            >
              {t.home}
            </a>
            <a
              href="#about"
              className={`nav-link transition-colors duration-300 ${activeSection === 'about' ? 'text-blue-500 font-medium' : 'text-gray-300 hover:text-white'}`}
            >
              {t.about}
            </a>
            <a
              href="#skills"
              className={`nav-link transition-colors duration-300 ${activeSection === 'skills' ? 'text-blue-500 font-medium' : 'text-gray-300 hover:text-white'}`}
            >
              {t.skills}
            </a>
            <a
              href="#projects"
              className={`nav-link transition-colors duration-300 ${activeSection === 'projects' ? 'text-blue-500 font-medium' : 'text-gray-300 hover:text-white'}`}
            >
              {t.projects}
            </a>
            <a
              href="#achievements"
              className={`nav-link transition-colors duration-300 ${activeSection === 'achievements' ? 'text-blue-500 font-medium' : 'text-gray-300 hover:text-white'}`}
            >
              {t.achievements}
            </a>
            <a
              href="#contact"
              className={`nav-link transition-colors duration-300 ${activeSection === 'contact' ? 'text-blue-500 font-medium' : 'text-gray-300 hover:text-white'}`}
            >
              {t.contact}
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-primary/95 dark:bg-slate-900/95 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className={`block px-3 py-2 rounded-md ${activeSection === 'home' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.home}
            </a>
            <a
              href="#about"
              className={`block px-3 py-2 rounded-md ${activeSection === 'about' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.about}
            </a>
            <a
              href="#skills"
              className={`block px-3 py-2 rounded-md ${activeSection === 'skills' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.skills}
            </a>
            <a
              href="#projects"
              className={`block px-3 py-2 rounded-md ${activeSection === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.projects}
            </a>
            <a
              href="#achievements"
              className={`block px-3 py-2 rounded-md ${activeSection === 'achievements' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.achievements}
            </a>
            <a
              href="#contact"
              className={`block px-3 py-2 rounded-md ${activeSection === 'contact' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.contact}
            </a>

            {/* Controls */}
            <div className="flex justify-between px-3 py-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Toggle language"
              >
                {language === 'en' ? 'FR' : 'EN'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
