import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';

const repositories = [
  {
    id: 1,
    name: "awesome-project",
    description: "A full-stack application built with React and Node.js",
    stars: 128,
    forks: 45,
    language: "JavaScript"
  },
  {
    id: 2,
    name: "portfolio-website",
    description: "Personal portfolio website built with React and Tailwind CSS",
    stars: 89,
    forks: 32,
    language: "TypeScript"
  },
  {
    id: 3,
    name: "react-components",
    description: "A collection of reusable React components",
    stars: 256,
    forks: 78,
    language: "JavaScript"
  }
];

const contributionData = [
  8, 12, 5, 9, 15, 7, 10, 13, 6, 11, 14, 8
].map((value, index) => ({
  date: new Date(2025, index, 1).toLocaleDateString('en-US', { month: 'short' }),
  count: value
}));

const GitHubActivity = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <FaGithub className="text-4xl mr-4 dark:text-white" />
          <h2 className="text-4xl font-bold dark:text-white">
            GitHub Activity
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              Contribution Activity
            </h3>
            <div className="flex items-end space-x-2 h-48">
              {contributionData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(data.count / 15) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full bg-green-500 rounded-t"
                  />
                  <span className="text-xs mt-2 text-gray-600 dark:text-gray-400 rotate-45">
                    {data.date}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Repositories */}
          <div className="space-y-4">
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {repo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {repo.description}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span className="dark:text-gray-300">{repo.stars}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCodeBranch className="text-gray-500 mr-2" />
                    <span className="dark:text-gray-300">{repo.forks}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-blue-500 mr-2" />
                    <span className="dark:text-gray-300">{repo.language}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <FaGithub className="mr-2" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
