import { motion } from 'framer-motion';
import { FaTrophy, FaCertificate, FaMedal, FaAward } from 'react-icons/fa';

const achievements = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    date: "2025",
    icon: FaCertificate,
    color: "text-yellow-500"
  },
  {
    id: 2,
    title: "Best Developer Award",
    organization: "Tech Conference 2024",
    date: "2024",
    icon: FaTrophy,
    color: "text-blue-500"
  },
  {
    id: 3,
    title: "React Development Expert",
    organization: "Meta",
    date: "2024",
    icon: FaMedal,
    color: "text-green-500"
  },
  {
    id: 4,
    title: "Innovation Excellence",
    organization: "Industry Awards",
    date: "2023",
    icon: FaAward,
    color: "text-purple-500"
  }
];

const Achievements = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          Achievements & Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <achievement.icon className={`w-12 h-12 ${achievement.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {achievement.organization}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {achievement.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Certifications
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
