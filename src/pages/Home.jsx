import { motion } from 'framer-motion';
import { useRef } from 'react';
import Experience from '../components/Experience';
import profileImage from '../assets/images/profile.jpg';

// Import page components
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Achievements from './Achievements';
import Contact from './Contact';

// Language content
const content = {
  en: {
    greeting: "Hi, I'm",
    name: "Mohamed Haroun Kaida",
    title: "Future Software Engineer | Robotics & AI Enthusiast",
    scrollDown: "Scroll down to explore",
    sections: {
      about: "About Me",
      skills: "My Skills",
      projects: "Projects",
      achievements: "Achievements",
      contact: "Contact"
    }
  },
  fr: {
    greeting: "Bonjour, je suis",
    name: "Mohamed Haroun Kaida",
    title: "Futur Ingénieur Logiciel | Passionné de Robotique & IA",
    scrollDown: "Défilez pour explorer",
    sections: {
      about: "À Propos de Moi",
      skills: "Mes Compétences",
      projects: "Projets",
      achievements: "Réalisations",
      contact: "Contact"
    }
  }
};

const Home = ({ language }) => {
  // Text content based on selected language
  const t = content[language];
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="relative w-full h-screen mx-auto">
        {/* 3D Experience - with fixed height */}
        <div className="absolute inset-0 z-[-1]" style={{ height: '100vh' }}>
          <Experience />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="glass-effect p-10 rounded-2xl max-w-xl flex flex-col md:flex-row items-center gap-8 shadow-xl border border-white/10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20 flex-shrink-0 relative"
              whileHover={{ scale: 1.05 }}
            >
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse"></div>

              <img
                src={profileImage}
                alt="Mohamed Haroun"
                className="w-full h-full object-cover relative z-10"
                loading="eager"
              />
            </motion.div>

            <div className="flex flex-col items-center md:items-start">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-xl sm:text-2xl text-blue-300 font-medium"
              >
                {t.greeting}
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="text-3xl sm:text-5xl font-bold mt-2 text-gradient leading-tight"
              >
                {t.name}
              </motion.h1>
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-lg sm:text-xl font-medium mt-4 text-gray-200 leading-relaxed"
              >
                {t.title}
              </motion.h3>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="flex space-x-4 mt-4"
              >
                <motion.a
                  href="https://github.com/Haroun-educ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/70 p-2 rounded-full hover:bg-gray-700/70 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/haroun-educ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/70 p-2 rounded-full hover:bg-gray-700/70 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linktr.ee/Harouneduc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/70 p-2 rounded-full hover:bg-gray-700/70 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.092 2.210a1.5 1.5 0 0 1 2.116 0L12 3.838l1.792-1.628a1.5 1.5 0 0 1 2.116 0c.584.584.584 1.532 0 2.116L13.416 6.5l2.492 2.174a1.5 1.5 0 0 1 0 2.116 1.5 1.5 0 0 1-2.116 0L12 9.162l-1.792 1.628a1.5 1.5 0 0 1-2.116 0 1.5 1.5 0 0 1 0-2.116L10.584 6.5 8.092 4.326a1.5 1.5 0 0 1 0-2.116zM12 12.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-3 0v-7a1.5 1.5 0 0 1 1.5-1.5z" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 cursor-pointer transition-all duration-300"
            onClick={scrollToAbout}
            whileHover={{ y: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gradient font-medium mb-2 text-sm"
              >
                {t.scrollDown}
              </motion.p>
              <div className="glass-effect w-[36px] h-[70px] rounded-full border border-blue-500/30 flex justify-center items-start p-2 shadow-lg shadow-blue-500/10">
                <motion.div
                  animate={{
                    y: [0, 30, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md shadow-blue-500/50"
                />
              </div>

              {/* Arrow down animation */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="max-w-7xl mx-auto px-4 mb-12"
        >
          <h2 className="text-4xl font-bold text-white text-center relative inline-block mx-auto">
            <motion.span
              className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.sections.about}
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>
        <div className="container mx-auto px-4">
          <About language={language} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="max-w-7xl mx-auto px-4 mb-12"
        >
          <h2 className="text-4xl font-bold text-white text-center relative inline-block mx-auto">
            <motion.span
              className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.sections.skills}
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>
        <div className="container mx-auto px-4">
          <Skills language={language} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="max-w-7xl mx-auto px-4 mb-12"
        >
          <h2 className="text-4xl font-bold text-white text-center relative inline-block mx-auto">
            <motion.span
              className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.sections.projects}
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>
        <div className="container mx-auto px-4">
          <Projects language={language} />
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="max-w-7xl mx-auto px-4 mb-12"
        >
          <h2 className="text-4xl font-bold text-white text-center relative inline-block mx-auto">
            <motion.span
              className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.sections.achievements}
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>
        <div className="container mx-auto px-4">
          <Achievements language={language} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="max-w-7xl mx-auto px-4 mb-12"
        >
          <h2 className="text-4xl font-bold text-white text-center relative inline-block mx-auto">
            <motion.span
              className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t.sections.contact}
            </motion.span>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>
        <div className="container mx-auto px-4">
          <Contact language={language} />
        </div>
      </section>
    </div>
  );
};

export default Home;
