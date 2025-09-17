/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { GithubIcon, ExternalLink, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { API_URL } from "../../apiurl";
import { ThemeContext } from '../contexts/theme';

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/project/fetch`);
        setProjects(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className={`section-padding min-h-[70vh] ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Featured Projects
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Here are some of my recent projects that showcase my skills and
            experience
          </p>
        </motion.div>

        {/* Spinner while loading */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <BeatLoader color="#4f46e5" size={10} />
          </div>
        ) : projects?.length > 0 ?  (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg shadow-lg overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
              >
                <div
                  className={`h-60 cursor-pointer ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-sm rounded-full ${theme === 'light' 
                          ? 'bg-gray-100 text-gray-700' 
                          : 'bg-gray-800 text-gray-300'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="py-2.5 mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'light' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-blue-900 text-blue-200'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center hover:text-primary-600 ${theme === 'light' 
                        ? 'text-gray-600 hover:text-primary-600' 
                        : 'text-gray-300 hover:text-primary-400'}`}
                    >
                      <GithubIcon className="w-5 h-5 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center cursor-pointer hover:text-primary-600 ${theme === 'light' 
                        ? 'text-gray-600 hover:text-primary-600' 
                        : 'text-gray-300 hover:text-primary-400'}`}
                    >
                      <ExternalLink className="w-5 h-5 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
            <div className={`col-span-full text-center mt-12 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              <p className="text-lg">No projects found.</p>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Please check back later.</p>
            </div>
          )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 ${theme === 'light' 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {selectedProject.title}
                </h3>
                <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedProject.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${theme === 'light' 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-gray-800 text-gray-300'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="py-2.5 mt-2 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'light' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-blue-900 text-blue-200'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center hover:text-primary-600 ${theme === 'light' 
                      ? 'text-gray-600 hover:text-primary-600' 
                      : 'text-gray-300 hover:text-primary-400'}`}
                  >
                    <GithubIcon className="w-5 h-5 mr-1" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center hover:text-primary-600 ${theme === 'light' 
                      ? 'text-gray-600 hover:text-primary-600' 
                      : 'text-gray-300 hover:text-primary-400'}`}
                  >
                    <ExternalLink className="w-5 h-5 mr-1" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;