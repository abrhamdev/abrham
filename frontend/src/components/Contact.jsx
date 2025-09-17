/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../apiurl';
import { toast } from 'react-toastify';
import { ThemeContext } from '../contexts/theme';

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const response = await axios.post(
        `${API_URL}/message/send`,
        formData,
      );
      toast.success(response.data.message);
      setFormData({name:'',email:'',message:''});
      setSending(false);
    } catch (error) {
      setSending(false);
      toast.error(error.response?.data?.message || 'Message Not Sent');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className={`section-padding ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Get in Touch
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className={`w-6 h-6 mt-1 ${theme === 'light' ? 'text-primary-600' : 'text-purple-700'}`} />
                  <div>
                    <h4 className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Email</h4>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>abrhamabebe564@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className={`w-6 h-6 mt-1 ${theme === 'light' ? 'text-primary-600' : 'text-purple-700'}`} />
                  <div>
                    <h4 className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Phone</h4>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>+251 948910520</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className={`w-6 h-6 mt-1 ${theme === 'light' ? 'text-primary-600' : 'text-purple-700'}`} />
                  <div>
                    <h4 className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Location</h4>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Connect with Me
              </h3>
              <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Follow me on social media or check out my work on GitHub.
              </p>
              {/* Add social media links here */}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    theme === 'light' 
                      ? 'border-gray-300 bg-white text-gray-900' 
                      : 'border-gray-600 bg-gray-700 text-white'
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    theme === 'light' 
                      ? 'border-gray-300 bg-white text-gray-900' 
                      : 'border-gray-600 bg-gray-700 text-white'
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    theme === 'light' 
                      ? 'border-gray-300 bg-white text-gray-900' 
                      : 'border-gray-600 bg-gray-700 text-white'
                  }`}
                />
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type="submit"
                  disabled={sending}
                  className={`${sending ? 'bg-gray-700 cursor-wait':''} w-fit flex items-center cursor-pointer justify-center space-x-2 px-6 py-3 font-medium rounded-lg transition-colors ${
                    theme === 'light'
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;