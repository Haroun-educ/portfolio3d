import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { debounce } from '../utils/performance';

// Import project images
import project1Image from '../assets/images/project1-min.jpg';
import project2Image from '../assets/images/project2-min.jpg';
import project3Image from '../assets/images/project3-min.jpg';
import project4Image from '../assets/images/project4-min.jpg';
import project5Image from '../assets/images/project5-min.jpg';

// Language content
const content = {
  en: {
    title: "Projects",
    subtitle: "My Work",
    viewProject: "View Project",
    viewCode: "View Code",
    categories: {
      all: "All",
      web: "Web Development",
      ai: "AI & ML",
      robotics: "Robotics"
    }
  },
  fr: {
    title: "Projets",
    subtitle: "Mon Travail",
    viewProject: "Voir le Projet",
    viewCode: "Voir le Code",
    categories: {
      all: "Tous",
      web: "Développement Web",
      ai: "IA & ML",
      robotics: "Robotique"
    }
  }
};

// Project data
const projectsData = [
  {
    title: "3D Portfolio Website",
    description: "A creative and interactive portfolio website built with React, Three.js, and Tailwind CSS to showcase my skills and projects.",
    image: project1Image,
    tags: ["React", "Three.js", "Tailwind CSS"],
    category: "web",
    source_code_link: "https://github.com/Haroun-educ/portfolio",
    live_demo_link: "https://haroun-educ.github.io/portfolio3d/"
  },
  {
    title: "Simple Calculator",
    description: "A basic calculator application built with Python that can perform arithmetic operations.",
    image: project2Image,
    tags: ["Python", "Tkinter"],
    category: "web",
    source_code_link: null,
    live_demo_link: null
  },
  {
    title: "Snake Game",
    description: "A classic Snake game implemented in Python where the player controls a snake to eat food and grow without hitting walls or itself.",
    image: project3Image,
    tags: ["Python", "Pygame"],
    category: "web",
    source_code_link: null,
    live_demo_link: null
  },
  {
    title: "Smart City System",
    description: "A planned future project to develop a modular system for smart cities, integrating IoT devices, data analytics, and user interfaces.",
    image: project4Image,
    tags: ["IoT", "Python", "Web Development"],
    category: "robotics",
    source_code_link: null,
    live_demo_link: null
  },
  {
    title: "Line Following Robot",
    description: "A robotics project where a small robot follows a line on the ground using sensors and microcontrollers.",
    image: project5Image,
    tags: ["Arduino", "Robotics", "C++"],
    category: "robotics",
    source_code_link: null,
    live_demo_link: null
  }
];

const ProjectCard = ({ project, t }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use effect to simulate loading for images that might be cached
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded) setImageLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [imageLoaded]);

  // Handle image load event
  const handleImageLoad = (e) => {
    setImageLoaded(true);
    e.target.classList.add('opacity-100');
  };

  // Use effect to simulate loading for images that might be cached
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded) setImageLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [imageLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-2xl p-5 shadow-card card-hover"
    >
      <div className="relative w-full h-[230px] mb-4 group">
        <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800 shadow-md">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />

          {/* Overlay with project title on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gradient font-bold text-xl">{project.title}</h3>
        <p className="mt-2 text-gray-300 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 rounded-full border border-blue-500/20 backdrop-blur-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        {project.live_demo_link && (
          <a
            href={project.live_demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-lg text-sm flex items-center gap-2 font-medium shadow-lg shadow-blue-500/20 transform hover:-translate-y-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            {t.viewProject}
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = ({ language }) => {
  // Text content based on selected language
  const t = content[language];
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Optimize category change with debounce
  const debouncedCategoryChange = useCallback(
    debounce((category) => {
      setActiveCategory(category);
    }, 100),
    []
  );

  // Handle category change
  const handleCategoryChange = (category) => {
    debouncedCategoryChange(category);
  };

  // Simulate loading state for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-effect p-2 rounded-full flex flex-wrap gap-2 justify-center shadow-lg">
            {Object.entries(t.categories).map(([key, value]) => (
              <motion.button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {value}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-tertiary dark:bg-slate-800 rounded-2xl p-5 shadow-card animate-pulse">
                <div className="w-full h-[230px] mb-4 bg-gray-700 rounded-xl"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            ))
          ) : (
            // Actual projects
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} t={t} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
