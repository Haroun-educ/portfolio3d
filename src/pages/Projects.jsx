import { useState } from 'react';
import { motion } from 'framer-motion';

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
    image: "/images/projects/portfolio.png",
    tags: ["React", "Three.js", "Tailwind CSS"],
    category: "web",
    source_code_link: "https://github.com/Haroun-educ/portfolio",
    live_demo_link: "https://haroun-educ.github.io/portfolio3d/"
  },
  {
    title: "Simple Calculator",
    description: "A basic calculator application built with Python that can perform arithmetic operations.",
    image: "/images/projects/backend.png",
    tags: ["Python", "Tkinter"],
    category: "web",
    source_code_link: null,
    live_demo_link: null
  },
  {
    title: "Snake Game",
    description: "A classic Snake game implemented in Python where the player controls a snake to eat food and grow without hitting walls or itself.",
    image: "/images/projects/mobile.png",
    tags: ["Python", "Pygame"],
    category: "web",
    source_code_link: null,
    live_demo_link: null
  },
  {
    title: "Smart City System",
    description: "A planned future project to develop a modular system for smart cities, integrating IoT devices, data analytics, and user interfaces.",
    image: "/images/projects/creator.png",
    tags: ["IoT", "Python", "Web Development"],
    category: "robotics",
    source_code_link: null,
    live_demo_link: null
  },
  {
    title: "Line Following Robot",
    description: "A robotics project where a small robot follows a line on the ground using sensors and microcontrollers.",
    image: "/images/projects/jobit.png",
    tags: ["Arduino", "Robotics", "C++"],
    category: "robotics",
    source_code_link: null,
    live_demo_link: null
  }
];

const ProjectCard = ({ project, t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tertiary dark:bg-slate-800 rounded-2xl p-5 shadow-card"
    >
      <div className="relative w-full h-[230px] mb-4">
        <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy" // Add lazy loading
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onLoad={(e) => e.target.classList.add('opacity-100')}
            style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold text-xl">{project.title}</h3>
        <p className="mt-2 text-secondary text-sm">{project.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full"
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-sm flex items-center gap-2"
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

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        {/* Category filters */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(t.categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
