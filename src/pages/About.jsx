import { motion } from 'framer-motion';
import profileImage2 from '../assets/images/profile2.jpg';

// Language content
const content = {
  en: {
    title: "About Me",
    subtitle: "My Introduction",
    description: [
      "I am a first-year student in Software Design and Development (DUT CDL) at the École Supérieure de Technologie (EST) in Dakhla, Morocco. Passionate about programming, web development, and artificial intelligence, I am focused on building a strong foundation in software engineering.",
      "My academic journey at EST Dakhla allows me to deepen my technical skills in areas such as C programming, web technologies, databases, UML modeling, and computer networks. I plan to continue my studies at a prestigious engineering institution such as INPT, with long-term ambitions for an international career.",
      "When I'm not studying, you can find me working on programming projects, exploring the latest advancements in technology, or sharpening my problem-solving skills. I believe in continuous learning and am always looking for new challenges."
    ],
    education: "Education",
    experience: "Experience",
    interests: "Interests",
    educationItems: [
      {
        degree: "DUT in Software Design and Development (CDL)",
        institution: "EST Dakhla",
        year: "2025 – 2026 (in progress)"
      },
      {
        degree: "Baccalaureate in Physical Sciences (French Track)",
        institution: "Obtained",
        year: "2024 – 2025"
      },
      {
        degree: "Middle School Education",
        institution: "Ibn Battouta Middle School",
        year: "2019 – 2022"
      },
      {
        degree: "Primary School Education",
        institution: "École Ali ibn Abi Talib Primary School",
        year: "2017 – 2019"
      }
    ],
    experienceItems: [
      {
        position: "1st Place Winner",
        company: "Regional Robotics Competition",
        year: "Ibn Battouta Middle School",
        description: "Participated and won first place in the regional robotics competition under the supervision of Mr. Radouane Bendahou."
      },
      {
        position: "Participant",
        company: "Scratch Programming Contest",
        year: "6th Grade",
        description: "Participated in a programming contest using Scratch to create interactive projects."
      }
    ],
    interestItems: [
      "Artificial Intelligence",
      "Robotics",
      "Software Engineering",
      "Web Development",
      "Smart City Systems"
    ]
  },
  fr: {
    title: "À Propos de Moi",
    subtitle: "Mon Introduction",
    description: [
      "Je suis étudiant en première année de Conception et Développement de Logiciels (DUT CDL) à l'École Supérieure de Technologie (EST) de Dakhla, Maroc. Passionné par la programmation, le développement web et l'intelligence artificielle, je me concentre sur la construction d'une solide base en génie logiciel.",
      "Mon parcours académique à l'EST Dakhla me permet d'approfondir mes compétences techniques dans des domaines tels que la programmation en C, les technologies web, les bases de données, la modélisation UML et les réseaux informatiques. Je prévois de poursuivre mes études dans une institution d'ingénierie prestigieuse comme l'INPT, avec des ambitions internationales à long terme.",
      "Quand je n'étudie pas, vous pouvez me trouver en train de travailler sur des projets de programmation, d'explorer les dernières avancées technologiques ou d'affiner mes compétences en résolution de problèmes. Je crois en l'apprentissage continu et je suis toujours à la recherche de nouveaux défis."
    ],
    education: "Éducation",
    experience: "Expérience",
    interests: "Intérêts",
    educationItems: [
      {
        degree: "DUT en Conception et Développement de Logiciels (CDL)",
        institution: "EST Dakhla",
        year: "2025 – 2026 (en cours)"
      },
      {
        degree: "Baccalauréat en Sciences Physiques (Filière Française)",
        institution: "Obtenu",
        year: "2024 – 2025"
      },
      {
        degree: "Éducation Collégiale",
        institution: "Collège Ibn Battouta",
        year: "2019 – 2022"
      },
      {
        degree: "Éducation Primaire",
        institution: "École Primaire Ali ibn Abi Talib",
        year: "2017 – 2019"
      }
    ],
    experienceItems: [
      {
        position: "Vainqueur de la 1ère Place",
        company: "Compétition Régionale de Robotique",
        year: "Collège Ibn Battouta",
        description: "Participation et victoire à la première place de la compétition régionale de robotique sous la supervision de M. Radouane Bendahou."
      },
      {
        position: "Participant",
        company: "Concours de Programmation Scratch",
        year: "6ème année",
        description: "Participation à un concours de programmation utilisant Scratch pour créer des projets interactifs."
      }
    ],
    interestItems: [
      "Intelligence Artificielle",
      "Robotique",
      "Ingénierie Logicielle",
      "Développement Web",
      "Systèmes de Ville Intelligente"
    ]
  }
};

const About = ({ language }) => {
  // Text content based on selected language
  const t = content[language];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card"
          >
            <div className="space-y-4">
              {t.description.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <div className="w-full max-w-sm bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card">
              <div className="w-full h-64 rounded-xl mb-4 overflow-hidden">
                <img
                  src={profileImage2}
                  alt="Mohamed Haroun Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium text-white">Mohamed Haroun</h3>
                <p className="text-secondary mt-1">
                  {language === 'fr' ? 'Étudiant en CDL — EST Dakhla' : 'CDL Student — EST Dakhla'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education, Experience, and Interests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{t.education}</h3>
            <div className="space-y-4">
              {t.educationItems.map((item, index) => (
                <div key={index} className="border-l-2 border-blue-500 pl-4">
                  <h4 className="text-lg font-medium text-white">{item.degree}</h4>
                  <p className="text-secondary">{item.institution}</p>
                  <p className="text-gray-400 text-sm">{item.year}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{t.experience}</h3>
            <div className="space-y-4">
              {t.experienceItems.map((item, index) => (
                <div key={index} className="border-l-2 border-purple-500 pl-4">
                  <h4 className="text-lg font-medium text-white">{item.position}</h4>
                  <p className="text-secondary">{item.company}</p>
                  <p className="text-gray-400 text-sm">{item.year}</p>
                  <p className="text-gray-300 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-tertiary dark:bg-slate-800 rounded-2xl p-6 shadow-card"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{t.interests}</h3>
            <div className="flex flex-wrap gap-2">
              {t.interestItems.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
