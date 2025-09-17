/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

const experiences = [
  {
    title: 'Network & ICT',
    company: 'University of Gondar',
    period: 'July 2023 - October 2023',
    description: [
      'Assisted in managing and maintaining network infrastructure',
      'Developed internal tools for network monitoring and reporting',
      'Collaborated with the IT team on system administration tasks',
      'Implemented security best practices and protocols',
    ],
  },
];

const education = [
  {
    degree: 'Computer Science',
    institution: 'Gondar University',
    period: '2022 - 2025',
    description: [
      'Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems',
      'GPA: 3.74',
      'EXIT: 86',
    ],
  },
];

const Experience = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section id="experience" className={`section-padding ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Experience & Education
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={`text-2xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative pl-8 pb-8 border-l-2 last:pb-0 ${
                    theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                  }`}
                >
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                    theme === 'light' ? 'bg-gray-600' : 'bg-gray-400'
                  }`} />
                  <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {exp.title}
                  </h4>
                  <p className={`font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>
                    {exp.company}
                  </p>
                  <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{exp.period}</p>
                  <ul className={`list-disc list-inside space-y-2 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={`text-2xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`relative pl-8 pb-8 border-l-2 last:pb-0 ${
                    theme === 'light' ? 'border-gray-200' : 'border-gray-700'
                  }`}
                >
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                    theme === 'light' ? 'bg-gray-600' : 'bg-gray-400'
                  }`} />
                  <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-primary-600' : 'text-white'}`}>
                    {edu.degree}
                  </h4>
                  <p className={`font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'}`}>
                    {edu.institution}
                  </p>
                  <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{edu.period}</p>
                  <ul className={`list-disc list-inside space-y-2 ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {edu.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;