import { motion } from 'framer-motion';

// Language content
const content = {
  en: {
    title: "Achievements",
    subtitle: "My Accomplishments",
    competitions: "Competitions",
    certifications: "Certifications",
    awards: "Awards & Recognition"
  },
  fr: {
    title: "Réalisations",
    subtitle: "Mes Accomplissements",
    competitions: "Compétitions",
    certifications: "Certifications",
    awards: "Prix & Reconnaissances"
  }
};

// Achievement data
const achievements = {
  competitions: [
    {
      title: "1st Place at Regional Robotics Competition",
      organization: "Ibn Battouta Middle School",
      date: "2021",
      description: "Won first place in the regional robotics competition under the supervision of Mr. Radouane Bendahou, demonstrating skills in robot design, programming, and problem-solving."
    },
    {
      title: "Participant in Scratch Programming Contest",
      organization: "6th Grade Competition",
      date: "2019",
      description: "Participated in a programming contest using Scratch to create interactive projects, gaining valuable experience in computational thinking and creative problem-solving."
    }
  ],
  certifications: [
    {
      title: "Harvard CS50x (Introduction to Computer Science)",
      organization: "Harvard University (via edX)",
      date: "2023",
      description: "Audited this comprehensive introduction to computer science course covering algorithms, data structures, web development, and more. (No official certificate)"
    }
  ],
  awards: [
    {
      title: "Academic Excellence Award",
      organization: "Ibn Battouta Middle School",
      date: "2022",
      description: "Recognized for outstanding academic performance and dedication to learning across all subjects."
    }
  ]
};

const AchievementCard = ({ achievement }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
        <div className="flex items-center mt-2 md:mt-0">
          <span className="text-blue-400 text-sm">{achievement.organization}</span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-400 text-sm">{achievement.date}</span>
        </div>
      </div>
      <p className="text-secondary">{achievement.description}</p>
    </motion.div>
  );
};

const AchievementSection = ({ title, items, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="mb-12"
    >
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">{title}</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <AchievementCard key={index} achievement={item} />
        ))}
      </div>
    </motion.div>
  );
};

const Achievements = ({ language }) => {
  // Text content based on selected language
  const t = content[language];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        <AchievementSection
          title={t.competitions}
          items={achievements.competitions}
          delay={0.2}
        />

        <AchievementSection
          title={t.certifications}
          items={achievements.certifications}
          delay={0.4}
        />

        <AchievementSection
          title={t.awards}
          items={achievements.awards}
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Achievements;
