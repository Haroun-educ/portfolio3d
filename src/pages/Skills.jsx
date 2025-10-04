import { motion } from 'framer-motion';

// Language content
const content = {
  en: {
    title: "My Skills",
    subtitle: "Technical Expertise",
    programmingLanguages: "Programming Languages",
    frameworks: "Frameworks & Libraries",
    tools: "Tools & Technologies",
    other: "Other Skills"
  },
  fr: {
    title: "Mes Compétences",
    subtitle: "Expertise Technique",
    programmingLanguages: "Langages de Programmation",
    frameworks: "Frameworks & Bibliothèques",
    tools: "Outils & Technologies",
    other: "Autres Compétences"
  }
};

// Skill data
const skills = {
  programmingLanguages: [
    { name: "Python", level: 50 },
    { name: "C", level: 40 },
    { name: "C#", level: 35 },
    { name: "Scratch", level: 80 },
    { name: "HTML/CSS", level: 40 }
  ],
  frameworks: [
    { name: "React", level: 25 },
    { name: "Three.js", level: 20 },
    { name: "Tailwind CSS", level: 25 }
  ],
  tools: [
    { name: "Visual Studio Code", level: 75 },
    { name: "Git & GitHub", level: 60 },
    { name: "Replit", level: 70 },
    { name: "Notion", level: 35 },
    { name: "Adobe Photoshop", level: 50 },
    { name: "Illustrator", level: 40 },
    { name: "Canva", level: 85 }
  ],
  other: [
    { name: "Problem Solving", level: 80 },
    { name: "Teamwork", level: 85 },
    { name: "Adaptability", level: 75 },
    { name: "Quick Learning", level: 85 },
    { name: "Effective Communication", level: 75 },
    { name: "Working with Open-minded People", level: 80 }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkillCategory
            title={t.programmingLanguages}
            skills={skills.programmingLanguages}
            delay={0.2}
          />
          <SkillCategory
            title={t.frameworks}
            skills={skills.frameworks}
            delay={0.4}
          />
          <SkillCategory
            title={t.tools}
            skills={skills.tools}
            delay={0.6}
          />
          <SkillCategory
            title={t.other}
            skills={skills.other}
            delay={0.8}
          />
        </div>
      </div>
    </div>
  );
};

export default Skills;
