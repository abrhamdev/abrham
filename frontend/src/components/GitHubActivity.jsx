import { motion } from 'framer-motion';
import { useEffect, useState, useContext } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import { ThemeContext } from '../contexts/theme';

const GitHubActivity = () => {
  const { theme } = useContext(ThemeContext);
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
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <FaGithub className={`text-4xl mr-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
          <h2 className={`text-4xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            GitHub Activity
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg p-6 shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
          >
            <h3 className={`text-xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Contribution Activity
            </h3>
            <div className="overflow-x-auto">
              <GitHubCalendar
                username="abrhamdev"
                blockSize={15}
                blockMargin={5}
                fontSize={14}
                colorScheme={theme === 'light' ? 'light' : 'dark'}
                theme={{
                  light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=abrhamdev&show_icons=true&theme=${theme === 'light' ? 'default' : 'tokyonight'}`}
                  alt="GitHub Stats"
                  className="w-full md:w-[420px]"
                />
              </div>
              
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com?user=abrhamdev&theme=${theme === 'light' ? 'buefy' : 'tokyonight'}`}
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
                className={`rounded-lg p-6 shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
              >
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {repo.name}
                </h3>
                <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <FaCodeBranch className={`mr-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className={`mr-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{repo.language || 'N/A'}</span>
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
            className={`inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-colors ${
              theme === 'light' 
                ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
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