import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript/ES6+', level: 85 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    title: 'Backend Development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'RESTful APIs', level: 85 },
    ],
  },
  {
    title: 'Networking & Systems',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    skills: [
      { name: 'TCP/IP Networking', level: 75 },
      { name: 'IP Addressing & Subnetting', level: 80 },
      { name: 'DNS Configuration', level: 65 },
      { name: 'Router & Switch Configuration', level: 60 },
      { name: 'Network Troubleshooting', level: 75 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: [
      { name: 'Git & GitHub', level: 85 },
    ],
  },
];

const SkillBar = ({ skill, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  return (
    <div key={skill.name} className="relative" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm tracking-wide">
          {skill.name}
        </span>
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, delay: delay + 0.5 }}
          className="text-gray-300 dark:text-gray-300 font-semibold text-xs bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 shadow-sm"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};

const SkillCategory = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      
      <div className="relative bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 h-full">
        <div className="flex items-center mb-6">
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
            className="p-3 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-lg mr-4"
          >
            <div className="text-gray-300 dark:text-gray-300">
              {category.icon}
            </div>
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {category.title}
          </h3>
        </div>
        
        <div className="space-y-5">
          {category.skills.map((skill, skillIndex) => (
            <SkillBar 
              key={skill.name} 
              skill={skill} 
              delay={index * 0.15 + skillIndex * 0.1} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  return (
    <section id="skills" ref={ref} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and proficiency levels across different domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={category.title} 
              category={category} 
              index={index} 
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Continuously expanding my skill set through projects and ongoing learning
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;