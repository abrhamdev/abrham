import { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Grid, 
  List, 
  Shuffle, 
  RotateCcw, 
  Code,
  Star,
  GitBranch,
  Eye,
  Calendar,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { ThemeContext } from '../contexts/theme';

// Safe ProjectCard component with error handling
const ProjectCard = ({ project }) => {
  const { theme } = useContext(ThemeContext);
  
  // Check if project is defined
  if (!project) {
    return (
      <div className={`rounded-xl shadow-lg p-6 border ${theme === 'light' 
        ? 'bg-white border-gray-100' 
        : 'bg-gray-800 border-gray-700'}`}>
        <div className="animate-pulse">
          <div className={`h-6 rounded w-3/4 mb-4 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
          <div className={`h-4 rounded w-full mb-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
          <div className={`h-4 rounded w-5/6 mb-4 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
          <div className="flex space-x-2 mb-4">
            <div className={`h-6 rounded w-16 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
            <div className={`h-6 rounded w-20 ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get primary language color (you can expand this with more colors)
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-600',
      Python: 'bg-green-600',
      HTML: 'bg-red-600',
      CSS: 'bg-blue-400',
      Java: 'bg-red-700',
      Ruby: 'bg-red-800',
      PHP: 'bg-purple-700',
      'C++': 'bg-pink-600',
      'C#': 'bg-purple-600',
      Go: 'bg-cyan-600',
      Rust: 'bg-orange-800',
      Default: 'bg-gray-400'
    };
    return colors[language] || colors.Default;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border h-full flex flex-col ${theme === 'light' 
        ? 'bg-white border-gray-100' 
        : 'bg-gray-800 border-gray-700'}`}
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {project.name || "Untitled Project"}
          </h3>
          {project.language && (
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)} mr-2`}></span>
              <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{project.language}</span>
            </div>
          )}
        </div>
        
        <p className={`mb-4 leading-relaxed line-clamp-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          {project.description || "No description available."}
        </p>
        
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-md text-xs font-medium ${theme === 'light' 
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700' 
                  : 'bg-gradient-to-r from-primary-900/30 to-primary-800/20 text-primary-300'}`}
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className={`px-2 py-1 rounded-md text-xs ${theme === 'light' 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-gray-700 text-gray-300'}`}>
                +{project.topics.length - 4} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <div className={`flex items-center space-x-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {project.stargazers_count || 0}
            </div>
            <div className="flex items-center">
              <GitBranch className="w-4 h-4 mr-1" />
              {project.forks_count || 0}
            </div>
            {project.updated_at && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(project.updated_at)}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {project.homepage && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${theme === 'light' 
                  ? 'bg-gray-100 hover:bg-gray-200' 
                  : 'bg-gray-700 hover:bg-gray-600'}`}
                title="Live Demo"
              >
                <Eye className="w-4 h-4" />
              </motion.a>
            )}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${theme === 'light' 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-700 hover:bg-gray-600'}`}
              title="View Code"
            >
              <Code className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InteractiveProjects = () => {
  const { theme } = useContext(ThemeContext);
  const [repos, setRepos] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalRepos, setOriginalRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axios.get('https://api.github.com/users/abrhamdev/repos');
        
        // Sort by stars and get top repos
        const topRepos = data
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6); // Top 6 repos
          setOriginalRepos(topRepos);
        try {
          const saved = localStorage.getItem('reordered-projects');
          if (saved) {
            const savedOrder = JSON.parse(saved);
            // Ensure we only use repos that exist in our fetched data
            const validRepos = savedOrder.filter(savedRepo => 
              topRepos.some(repo => repo.id === savedRepo.id)
            );
            // Add any new repos that weren't in the saved order
            const newRepos = topRepos.filter(repo => 
              !validRepos.some(savedRepo => savedRepo.id === repo.id)
            );
            setRepos([...validRepos, ...newRepos]);
          } else {
            setRepos(topRepos);
          }
        } catch (e) {
          console.error("Error parsing saved projects:", e);
          setRepos(topRepos);
        }
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        setError('Failed to load projects. Please try again later.');
        // Fallback to sample data if API fails
        setRepos([
          {
            id: 1,
            name: "NovaReads",
            description: "Book recommendation system using microservices & ML",
            stargazers_count: 42,
            forks_count: 18,
            language: "JavaScript",
            html_url: "#",
            topics: ["react", "nodejs", "mongodb"]
          },
          {
            id: 2,
            name: "Dotube",
            description: "YouTube video downloader with playlist support",
            stargazers_count: 87,
            forks_count: 34,
            language: "Python",
            html_url: "#",
            topics: ["python", "ffmpeg", "download"]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('reordered-projects', JSON.stringify(repos));
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  }, [repos]);

  const shuffleProjects = () => {
    setIsSorting(true);
    const shuffled = [...repos].sort(() => Math.random() - 0.5);
    setRepos(shuffled);
    setTimeout(() => setIsSorting(false), 800);
  };

  const resetOrder = () => {
    setIsSorting(true);
    // Reset to GitHub's star-based order
    setRepos(originalRepos);
    setTimeout(() => setIsSorting(false), 800);
  };

  if (isLoading) {
    return (
      <section className={`py-24 ${theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 to-gray-100' 
        : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
        <div className="container mx-auto px-4 text-center">
          <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 ${theme === 'light' ? 'text-primary-600' : 'text-primary-400'}`} />
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>Loading projects from GitHub...</p>
        </div>
      </section>
    );
  }

  if (error && repos.length === 0) {
    return (
      <section className={`py-24 ${theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 to-gray-100' 
        : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={theme === 'light' ? 'text-red-600' : 'text-red-400 mb-4'}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-24 ${theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 to-gray-100' 
      : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-5 tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">GitHub</span> Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Explore my open-source projects. Drag to reorder, shuffle, or reset to GitHub's star-based ranking.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${theme === 'light' 
              ? viewMode === 'grid' 
                ? 'bg-primary-600 text-gray-400 shadow-lg' 
                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              : viewMode === 'grid'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg'
            }`}
          >
            <Grid className="w-4 h-4" />
            Grid View
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${theme === 'light' 
              ? viewMode === 'list' 
                ? `bg-primary-600 text-gray-400 shadow-lg`
                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              : viewMode === 'list'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shuffleProjects}
            disabled={isSorting}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 ${theme === 'light' 
              ? 'bg-white text-gray-700 shadow-md hover:shadow-lg' 
              : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg'}`}
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetOrder}
            disabled={isSorting}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 ${theme === 'light' 
              ? 'bg-white text-gray-700 shadow-md hover:shadow-lg' 
              : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg'}`}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Order
          </motion.button>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {viewMode === 'list' ? (
            <Reorder.Group 
              axis="y" 
              values={repos} 
              onReorder={setRepos}
              className="space-y-4 max-w-4xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {repos.map((project) => (
                  <Reorder.Item
                    key={project.id}
                    value={project}
                    whileDrag={{
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      zIndex: 10
                    }}
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 300
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <ProjectCard project={project} />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {repos.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-center mt-16 p-6 rounded-2xl shadow-lg border max-w-2xl mx-auto ${theme === 'light' 
            ? 'bg-white border-gray-100' 
            : 'bg-gray-800 border-gray-700'}`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Interactive GitHub Showcase
          </h3>
          <p className={`text-sm mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {viewMode === 'list' 
              ? 'Drag projects to reorder them. Use the buttons above to shuffle or reset to GitHub star ranking.'
              : 'Switch to list view to enable drag-and-reorder functionality.'
            }
          </p>
          <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Data fetched from your GitHub repository API in real-time
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveProjects;