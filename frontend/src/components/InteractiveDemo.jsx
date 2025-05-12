import { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveDemo = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, color: '#FF0000', x: 0, y: 0 },
    { id: 2, color: '#00FF00', x: 0, y: 0 },
    { id: 3, color: '#0000FF', x: 0, y: 0 },
  ]);

  const [code, setCode] = useState(`// Try dragging the boxes!
const moveBox = (id, x, y) => {
  setBoxes(boxes.map(box => 
    box.id === id 
      ? { ...box, x, y }
      : box
  ));
};`);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          Interactive Demo
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 min-h-[400px] relative"
          >
            {boxes.map((box) => (
              <motion.div
                key={box.id}
                drag
                dragMomentum={false}
                dragConstraints={{
                  top: 0,
                  left: 0,
                  right: 300,
                  bottom: 300
                }}
                style={{
                  backgroundColor: box.color,
                  x: box.x,
                  y: box.y
                }}
                className="w-16 h-16 rounded-lg cursor-move absolute"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onDragEnd={(_, info) => {
                  const newBoxes = boxes.map((b) =>
                    b.id === box.id
                      ? { ...b, x: info.point.x, y: info.point.y }
                      : b
                  );
                  setBoxes(newBoxes);
                }}
              />
            ))}
          </motion.div>

          {/* Code Display */}
          <div className="bg-gray-900 rounded-lg p-6 text-white font-mono text-sm overflow-auto">
            <pre>{code}</pre>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setBoxes(boxes.map(box => ({ ...box, x: 0, y: 0 })))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Reset Position
          </button>
          <button
            onClick={() => {
              setBoxes(boxes.map(box => ({
                ...box,
                color: `#${Math.floor(Math.random()*16777215).toString(16)}`
              })));
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Random Colors
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
