import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

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
      "Worked as a Frontend Developer using React. Learned about Operating Systems, Design & Analysis of Algorithms, and AI fundamentals.",
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


const Timeline = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          My Journey
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700" />

          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center justify-between mb-8 ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="w-5/12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold mt-2 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {item.company}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 shadow-lg">
                {item.type === 'work' ? (
                  <FaBriefcase className="text-white text-xl" />
                ) : (
                  <FaGraduationCap className="text-white text-xl" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
