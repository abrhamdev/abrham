/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectForm from './ProjectForm';
import axios from 'axios';
import { API_URL } from '../../../apiurl';
import { toast } from 'react-toastify';

const AdminDashboard = ({ onLogout }) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects=async()=>{
      try{
      const response=await axios.get(`${API_URL}/project/fetch`);
      setProjects(response.data);
    }catch(error){
      toast.error(error.response?.data?.message);
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
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
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
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
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
    </div>
  );
};

export default AdminDashboard;
