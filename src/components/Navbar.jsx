import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { updateUrlHash, detectSectionInView, scrollToSection } from '../utils/scrollUtils';

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
      const currentSection = detectSectionInView(sections);

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        // Update URL hash when scrolling to a new section
        updateUrlHash(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

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
          ? 'glass-effect py-2 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center space-x-2"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold text-gradient">
              Mohamed Haroun
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                activeSection === 'home'
                  ? 'text-gradient font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === 'home' && (
                <motion.span
                  className="absolute inset-0 bg-gray-800/50 border border-blue-500/20 rounded-lg -z-10"
                  layoutId="navHighlight"
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                />
              )}
              {t.home}
            </motion.a>

            <motion.a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                activeSection === 'about'
                  ? 'text-gradient font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === 'about' && (
                <motion.span
                  className="absolute inset-0 bg-gray-800/50 border border-blue-500/20 rounded-lg -z-10"
                  layoutId="navHighlight"
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                />
              )}
              {t.about}
            </motion.a>

            <motion.a
              href="#skills"
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                activeSection === 'skills'
                  ? 'text-gradient font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === 'skills' && (
                <motion.span
                  className="absolute inset-0 bg-gray-800/50 border border-blue-500/20 rounded-lg -z-10"
                  layoutId="navHighlight"
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                />
              )}
              {t.skills}
            </motion.a>

            <motion.a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                activeSection === 'projects'
                  ? 'text-gradient font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === 'projects' && (
                <motion.span
                  className="absolute inset-0 bg-gray-800/50 border border-blue-500/20 rounded-lg -z-10"
                  layoutId="navHighlight"
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                />
              )}
              {t.projects}
            </motion.a>

            <motion.a
              href="#achievements"
              onClick={(e) => { e.preventDefault(); scrollToSection('achievements'); }}
              className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                activeSection === 'achievements'
                  ? 'text-gradient font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === 'achievements' && (
                <motion.span
                  className="absolute inset-0 bg-gray-800/50 border border-blue-500/20 rounded-lg -z-10"
                  layoutId="navHighlight"
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                />
              )}
              {t.achievements}
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                activeSection === 'contact'
                  ? 'text-gradient font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === 'contact' && (
                <motion.span
                  className="absolute inset-0 bg-gray-800/50 border border-blue-500/20 rounded-lg -z-10"
                  layoutId="navHighlight"
                  transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                />
              )}
              {t.contact}
            </motion.a>

            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-all duration-300 shadow-md"
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </motion.svg>
              ) : (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </motion.svg>
              )}
            </motion.button>

            {/* Language toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-all duration-300 text-sm font-medium shadow-md"
              aria-label="Toggle language"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                key={language}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={language === 'en' ? 'text-blue-300' : 'text-blue-300'}
              >
                {language === 'en' ? 'FR' : 'EN'}
              </motion.span>
            </motion.button>
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
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
                setIsMenuOpen(false);
              }}
            >
              {t.home}
            </a>
            <a
              href="#about"
              className={`block px-3 py-2 rounded-md ${activeSection === 'about' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
                setIsMenuOpen(false);
              }}
            >
              {t.about}
            </a>
            <a
              href="#skills"
              className={`block px-3 py-2 rounded-md ${activeSection === 'skills' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('skills');
                setIsMenuOpen(false);
              }}
            >
              {t.skills}
            </a>
            <a
              href="#projects"
              className={`block px-3 py-2 rounded-md ${activeSection === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
                setIsMenuOpen(false);
              }}
            >
              {t.projects}
            </a>
            <a
              href="#achievements"
              className={`block px-3 py-2 rounded-md ${activeSection === 'achievements' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('achievements');
                setIsMenuOpen(false);
              }}
            >
              {t.achievements}
            </a>
            <a
              href="#contact"
              className={`block px-3 py-2 rounded-md ${activeSection === 'contact' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
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
