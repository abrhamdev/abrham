/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectForm from './ProjectForm';
import axios from 'axios';
import { API_URL } from '../../../apiurl';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaBell } from 'react-icons/fa';

const AdminDashboard = ({ onLogout,setShowAdmin }) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!showNotifications) return;
     const token = localStorage.getItem('adminToken');
      setLoadingMessages(true);
      try {
        const response = await axios.get(`${API_URL}/message/fetch`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        
        setMessages(response.data);
      } catch (error) {
        toast.error('Failed to load messages');
        console.error('Error fetching messages:', error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [showNotifications]);

  useEffect(() => {
    const fetchProjects=async()=>{
      try{
      const response=await axios.get(`${API_URL}/project/fetch`);
      setProjects(response.data);
    }catch(error){
      toast.error(error.response?.data?.message);
    }finally{
      setLoading(false);
    }
    }

    fetchProjects();
  }, [projects]);

  

  const handleEditProject = async (project) => {
    setSelectedProject(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    const token=localStorage.getItem('adminToken');
  try {
    const response=await axios.delete(`${API_URL}/project/${projectId}`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });

    toast.success(response.data.message);

    setProjects((prevProjects) => prevProjects.filter(project => project._id !== projectId));
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(true)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              >
                <FaBell className="w-6 h-6" />
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
              <button
                onClick={() => setShowAdmin(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="font-bold">Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
            <button
              onClick={() => setShowProjectForm(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add New Project
            </button>
          </div>
{loading ? (
             <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
               <ClipLoader color="#3B82F6" size={60} />
             </div>
          ) : projects.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {projects.map((project) => (
                  <motion.li
                    key={project._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {project.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ):(
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300 mt-12">
              <p className="text-lg">No projects found.</p>
            </div>
          )}
        </div>
      </main>

      {showProjectForm && (
        <ProjectForm
          onClose={() => {
            setShowProjectForm(false);
            setSelectedProject(null);
          }}
          editProject={selectedProject}
        />
      )}

      {/* Notification Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity z-40" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                  <span className="text-sm p-4 text-gray-500 dark:text-gray-400">
                    {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                  </span>
                </div>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {loadingMessages ? (
                    <div className="flex justify-center py-4">
                      <ClipLoader color="#3B82F6" size={30} />
                    </div>
                  ) : messages.length > 0 ? (
                    messages.map((message) => (
                      <motion.div
                        key={message._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {message.name}
                            </h3>
                            <p className="mt-1 text-gray-600 dark:text-gray-300">
                              {message.email}
                            </p>
                            <p className="mt-2 text-gray-700 dark:text-gray-200">
                              {message.message}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <p className="text-gray-500 dark:text-gray-400">No new messages</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
