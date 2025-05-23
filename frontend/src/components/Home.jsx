import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import Blog from "./Blog";  

const Home = ({ onTriggerAdmin }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onTriggerAdmin={onTriggerAdmin} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
