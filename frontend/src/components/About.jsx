import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Image Container */}
            <div className="md:w-2/5 relative">
              <motion.div 
                initial={{ rotate: 6, opacity: 0.5 }}
                whileInView={{ rotate: 3, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-500 to-blue-500 rounded-2xl transform"
              />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src="/abrham.jpg"
                  alt="Abrham Abebe"
                  className="w-full h-auto grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
            
            {/* Content Container */}
            <div className="md:w-3/5">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 dark:text-white tracking-tight"
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Me</span>
              </motion.h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg"
                >
                  I'm a passionate Full Stack Developer with a deep love for creating
                  elegant and efficient digital solutions. My journey in technology began with a curiosity
                  about how things work, which led me to pursue a career in web development.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg"
                >
                  With experience in both frontend and backend development, I specialize in building
                  responsive web applications that deliver exceptional user experiences. I'm particularly
                  interested in modern web technologies and best practices in software development.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg"
                >
                  During my internship I gained valuable experience in network infrastructure and system administration,
                  which complements my software development skills.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg"
                >
                  I believe in continuous learning and staying up-to-date with the latest technologies
                  and industry trends. When I'm not coding, I enjoy contributing to open-source projects
                  and sharing my knowledge with the developer community.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;