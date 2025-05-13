/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

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
      'GPA: N/A',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Experience & Education
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {exp.company}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{exp.period}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
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
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{edu.period}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
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
