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
            className="bg-black/30 backdrop-blur-sm p-8 rounded-xl max-w-xl flex flex-col md:flex-row items-center gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-lg flex-shrink-0"
            >
              <img
                src={profileImage}
                alt="Mohamed Haroun"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex flex-col items-center md:items-start">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-xl sm:text-2xl text-blue-400 font-medium"
              >
                {t.greeting}
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="text-4xl sm:text-6xl font-bold mt-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >
                {t.name}
              </motion.h1>
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-xl sm:text-2xl font-medium mt-2 text-white"
              >
                {t.title}
              </motion.h3>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={scrollToAbout}
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400 mb-2"
              >
                {t.scrollDown}
              </motion.p>
              <div className="w-[30px] h-[64px] rounded-3xl border-4 border-gray-400 flex justify-center items-start p-2">
                <motion.div
                  animate={{
                    y: [0, 24, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 rounded-full bg-white"
                />
              </div>
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
