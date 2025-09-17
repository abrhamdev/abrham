import { motion, useInView } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useRef, useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

const timelineData = [
  {
    id: 5,
    year: "2021",
    title: "Joined Gondar University",
    company: "BSc in Computer Science",
    description:
      "Started my academic journey with foundation courses in programming, applied mathematics, and civics.",
    type: "education",
  },
  {
    id: 4,
    year: "2022",
    title: "Explored Web Development Basics",
    company: "University Projects",
    description:
      "Completed courses in Computer Programming 2, Data Structures, OOP, and Discrete Mathematics. Built my first static website.",
    type: "education",
  },
  {
    id: 3,
    year: "2023",
    title: "Web Programming & Internship",
    company: "StartUp Hub",
    description:
      "Took formal Web Programming, Software Engineering, and Java Programming. Interned as a Junior Web Developer working with HTML, CSS, JavaScript.",
    type: "work",
  },
  {
    id: 2,
    year: "2024",
    title: "Advanced Web Development",
    company: "Digital Solutions Inc",
    description:
      "Worked as a Full Stack Developer using React. Learned about Operating Systems, Design & Analysis of Algorithms, and AI fundamentals.",
    type: "work",
  },
  {
    id: 1,
    year: "2025",
    title: "Graduated with BSc in Computer Science",
    company: "Gondar University",
    description:
      "Completed courses like Compiler Design, Computer Security, Machine Learning, Distributed Systems, and Big Data. Specialized in Web Technologies.",
    type: "education",
  },
];

const TimelineItem = ({ item, index, totalItems }) => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Content Card */}
      <div className="w-full md:w-5/12 mb-4 md:mb-0">
        <motion.div 
          whileHover={{ y: -5 }}
          className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
            theme === 'light' 
              ? 'bg-white border-gray-100' 
              : 'bg-gray-800 border-gray-700'
          }`}
        >
          <span className={`text-sm font-semibold mb-2 block ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-300'
          }`}>
            {item.year}
          </span>
          <h3 className={`text-xl font-bold mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {item.title}
          </h3>
          <p className={`font-medium mb-3 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-300'
          }`}>
            {item.company}
          </p>
          <p className={`leading-relaxed ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            {item.description}
          </p>
          <div className={`mt-4 inline-block text-xs font-medium py-1 px-3 rounded-full ${
            item.type === 'work' 
              ? theme === 'light'
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-blue-900/30 text-blue-300'
              : theme === 'light'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-purple-900/30 text-purple-300'
          }`}>
            {item.type === 'work' ? 'Professional Experience' : 'Education'}
          </div>
        </motion.div>
      </div>

      {/* Icon - Mobile centered, Desktop positioned */}
      <div className={`absolute left-1/2 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg z-10 border-4 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-white to-gray-100 border-white'
          : 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-800'
      }`}>
        <motion.div 
          animate={isInView ? { scale: [0.8, 1.1, 1] } : { scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-2 md:p-3 rounded-full ${
            item.type === 'work' 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
              : 'bg-gradient-to-br from-purple-500 to-purple-600'
          }`}
        >
          {item.type === 'work' ? (
            <FaBriefcase className="text-white text-sm md:text-lg" />
          ) : (
            <FaGraduationCap className="text-white text-sm md:text-lg" />
          )}
        </motion.div>
      </div>

      {/* Year indicator on the opposite side - Desktop only */}
      <div className="hidden md:block w-5/12">
        <div className={`text-center ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
          <motion.span 
            animate={isInView ? { opacity: 1, color: ["#999", "#3B82F6", "#999"] } : { opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-4xl font-bold ${
              theme === 'light' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {item.year}
          </motion.span>
        </div>
      </div>

      {/* Mobile Year Indicator */}
      <div className="md:hidden w-full text-center mt-4">
        <motion.span 
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"
        >
          {item.year}
        </motion.span>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const { theme } = useContext(ThemeContext);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section ref={sectionRef} className={`py-16 md:py-24 overflow-hidden ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 to-gray-100' 
        : 'bg-gradient-to-br from-gray-900 to-gray-800'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-5 tracking-tight ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            A timeline of my career and educational milestones
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full opacity-80 ${
            theme === 'light'
              ? 'bg-gradient-to-b from-primary-400 via-primary-500 to-primary-400'
              : 'bg-gradient-to-b from-primary-600 via-primary-500 to-primary-600'
          }`} />

          {timelineData.map((item, index) => (
            <TimelineItem 
              key={item.id} 
              item={item} 
              index={index} 
              totalItems={timelineData.length} 
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`text-center mt-12 md:mt-16 pt-6 md:pt-8 border-t ${
            theme === 'light' ? 'border-gray-200' : 'border-gray-700'
          }`}
        >
          <p className={`text-sm ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Continuously growing and adapting to new challenges
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;