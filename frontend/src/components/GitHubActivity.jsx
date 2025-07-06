import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

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
const GitHubActivity = () => {
  
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const { data } = await axios.get('https://api.github.com/users/abrhamdev/repos');
        // Sort by stars
        const topRepos = data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6); // Top 6 repos
  
        setRepos(topRepos);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    };
  
    fetchRepos();
  }, []);

  
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
            <div className="overflow-x-auto text-white">
              <GitHubCalendar
                username="abrhamdev"
                blockSize={15}
                blockMargin={5}
                fontSize={14}
                colorScheme="dark"
                theme={{
                    light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                  }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=abrhamdev&show_icons=true&theme=tokyonight"
                  alt="GitHub Stats"
                  className="w-full md:w-[420px]"
                />
              </div>
              
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img
                  src="https://github-readme-streak-stats.herokuapp.com?user=abrhamdev&theme=tokyonight"
                  alt="GitHub Streak"
                  className="w-full md:w-[420px]"
                />
              </div>
            </div>

          </motion.div>

          {/* Top Repositories */}
          <div className="space-y-4">
            {repos.map((repo, index) => (
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
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center space-x-6">
                 {
                   /*
                   <div className="flex items-center">
                     <FaStar className="text-yellow-500 mr-2" />
                     <span className="dark:text-gray-300">{repo.stargazers_count}</span>
                   </div>
                   */
                 }
                  <div className="flex items-center">
                    <FaCodeBranch className="text-gray-500 mr-2" />
                    <span className="dark:text-gray-300">{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-blue-500 mr-2" />
                    <span className="dark:text-gray-300">{repo.language || 'N/A'}</span>
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
            href="https://github.com/abrhamdev"
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
