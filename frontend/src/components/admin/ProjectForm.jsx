/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import {API_URL} from '../../../apiurl';
import { ClipLoader } from 'react-spinners';

const ProjectForm = ({ onClose, editProject = null }) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(editProject || {
    title: '',
    description: '',
    technologies: '',
    image: null,
    liveUrl: '',
    githubUrl: '',
    featured: false
  });

  useEffect(() => {
    if (editProject) {
      setProject(editProject);
    }
  }, [editProject]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formData = new FormData();
  formData.append('title', project.title);
  formData.append('description', project.description);
  formData.append('technologies', project.technologies);
  formData.append('liveUrl', project.liveUrl);
  formData.append('githubUrl', project.githubUrl);
  formData.append('featured', project.featured);
  formData.append('image', project.image);

  const token= localStorage.getItem('adminToken');
  
  try {
    const response = await axios[editProject ? 'put' : 'post'](
      `${API_URL}/project/${editProject ? `update/${editProject._id}` : 'upload'}`,
      formData,
      {
      headers: {
         Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success(response.data.message);
    onClose();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Upload failed');
  }finally{
    setLoading(false);
  }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto my-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Title
              </label>
              <input
                type="text"
                required={!editProject}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                required={!editProject}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                required={!editProject}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={project.technologies}
                onChange={(e) => setProject({ ...project, technologies: e.target.value })}
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Cover Image
  </label>
  <input
    type="file"
    key={editProject ? 'edit' : 'create'} // Reset file input when switching between create/edit
    accept="image/*"
    required={!editProject}
    onChange={(e) => setProject({ ...project, image: e.target.files[0] })}
    className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-md"
  />
</div>


            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Live Demo URL
              </label>
              <input
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={project.liveUrl}
                onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                GitHub URL
              </label>
              <input
                type="url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={project.githubUrl}
                onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={project.featured}
                onChange={(e) => setProject({ ...project, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Featured Project
              </label>
            </div>
          </div>

          <div className="col-span-full flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
  type="submit"
  disabled={loading}
  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
    loading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center gap-2`}
>
  {loading ? (
    <>
      <ClipLoader color="#ffffff" size={16} /> {/* Spinner while loading */}
      Processing...
    </>
  ) : (
    editProject ? 'Save Changes' : 'Add Project'
  )}
</button>

          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProjectForm;
