import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';

const initialProjects = [
  { id: 1, title: "NovaReads", description: "Book recommendation system using microservices & ML" },
  { id: 2, title: "Dotube", description: "YouTube video downloader with playlist support" },
  { id: 3, title: "Portfolio Website", description: "Personal website showcasing skills and projects" },
  { id: 4, title: "Real-time Chat App", description: "MongoDB + Redis based group chat feature" }
];

const InteractiveProjects = () => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('reordered-projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem('reordered-projects', JSON.stringify(projects));
  }, [projects]);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">
          Drag & Arrange My Projects
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          A live demo of interactive UI design using React and Framer Motion. Try rearranging the cards below.
        </p>

        <Reorder.Group
          as="div"
          axis="y"
          values={projects}
          onReorder={setProjects}
          className="space-y-4 max-w-2xl mx-auto"
        >
          {projects.map((project) => (
            <Reorder.Item
              key={project.id}
              value={project}
              whileDrag={{ scale: 1.03, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-move"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setProjects(initialProjects)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Reset Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProjects;
