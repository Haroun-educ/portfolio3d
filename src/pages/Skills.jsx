import { motion } from 'framer-motion';

// Language content
const content = {
  en: {
    title: "My Skills",
    subtitle: "Technical Expertise",
    programming: "Programming",
    webDev: "Web Development",
    databases: "Databases & Modeling",
    networking: "Networking",
    tools: "Tools & Platforms",
    design: "Design",
    other: "Other Skills"
  },
  fr: {
    title: "Mes Compétences",
    subtitle: "Expertise Technique",
    programming: "Programmation",
    webDev: "Développement Web",
    databases: "Bases de Données & Modélisation",
    networking: "Réseaux",
    tools: "Outils & Plateformes",
    design: "Design",
    other: "Autres Compétences"
  }
};

// Skill data
const skills = {
  programming: [
    { name: "C (data structures, linked lists)", level: 55 },
    { name: "Python", level: 50 },
    { name: "C# (basics)", level: 30 },
    { name: "Scratch", level: 80 }
  ],
  webDev: [
    { name: "HTML5", level: 65 },
    { name: "CSS3 (responsive, flexbox, media queries)", level: 60 },
    { name: "JavaScript", level: 45 },
    { name: "React", level: 25 },
    { name: "Three.js", level: 20 },
    { name: "Tailwind CSS", level: 25 }
  ],
  databases: [
    { name: "SQL", level: 45 },
    { name: "NoSQL", level: 30 },
    { name: "UML Modeling", level: 40 }
  ],
  networking: [
    { name: "Cisco Packet Tracer", level: 40 },
    { name: "OSI Model", level: 50 },
    { name: "Network Protocols", level: 40 }
  ],
  tools: [
    { name: "VS Code", level: 75 },
    { name: "GitHub", level: 60 },
    { name: "Replit", level: 70 },
    { name: "Notion", level: 35 },
    { name: "Vite", level: 40 }
  ],
  design: [
    { name: "Adobe Photoshop", level: 50 },
    { name: "Illustrator", level: 40 },
    { name: "Canva", level: 85 }
  ],
  other: [
    { name: "Problem Solving", level: 80 },
    { name: "Teamwork", level: 85 },
    { name: "Adaptability", level: 75 },
    { name: "Quick Learning", level: 85 },
    { name: "Effective Communication", level: 75 }
  ]
};

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-white">{name}</span>
        <span className="text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        ></motion.div>
      </div>
    </div>
  );
};

const SkillCategory = ({ title, skills, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card"
    >
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div>
        {skills.map((skill, index) => (
          <SkillBar key={index} name={skill.name} level={skill.level} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = ({ language }) => {
  // Text content based on selected language
  const t = content[language];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory title={t.programming} skills={skills.programming} delay={0.1} />
          <SkillCategory title={t.webDev} skills={skills.webDev} delay={0.2} />
          <SkillCategory title={t.databases} skills={skills.databases} delay={0.3} />
          <SkillCategory title={t.networking} skills={skills.networking} delay={0.4} />
          <SkillCategory title={t.tools} skills={skills.tools} delay={0.5} />
          <SkillCategory title={t.design} skills={skills.design} delay={0.6} />
          <SkillCategory title={t.other} skills={skills.other} delay={0.7} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
