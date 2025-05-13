import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 ,delay:0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg transform rotate-6" />
                <img
                  src="/abrham.jpg" // Add your photo here
                  alt="Abrham Abebe"
                  className="relative z-10 w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                About Me
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a passionate Full Stack Developer with a deep love for creating
                  elegant and efficient digital solutions. My journey in technology began with a curiosity
                  about how things work, which led me to pursue a career in web development.
                </p>
                <p>
                  With experience in both frontend and backend development, I specialize in building
                  responsive web applications that deliver exceptional user experiences. I'm particularly
                  interested in modern web technologies and best practices in software development.
                </p>
                <p>
                  During my internship at the University of Gondar in the Network & ICT Directorate,
                  I gained valuable experience in network infrastructure and system administration,
                  which complements my software development skills.
                </p>
                <p>
                  I believe in continuous learning and staying up-to-date with the latest technologies
                  and industry trends. When I'm not coding, I enjoy contributing to open-source projects
                  and sharing my knowledge with the developer community.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
