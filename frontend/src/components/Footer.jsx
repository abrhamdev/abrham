import { GithubIcon, Linkedin, Mail } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a
              href="https://github.com/abrhamdev"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${theme === 'light' 
                ? 'text-gray-600 hover:text-primary-600' 
                : 'text-gray-400 hover:text-primary-400'}`}
              aria-label="GitHub"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/abrham-abebe-aa2042314"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${theme === 'light' 
                ? 'text-gray-600 hover:text-primary-600' 
                : 'text-gray-400 hover:text-primary-400'}`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:abrhamabebe564@gmail.com"
              className={`transition-colors ${theme === 'light' 
                ? 'text-gray-600 hover:text-primary-600' 
                : 'text-gray-400 hover:text-primary-400'}`}
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className={`text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            © {currentYear} Abrham Abebe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;