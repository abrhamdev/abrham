import { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/admin/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Custom hook to manage admin state
const useAdminState = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage?.getItem('adminToken');
    setIsAdmin(!!adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setShowAdmin(false);
  };

  return { isAdmin, setIsAdmin, showAdmin, setShowAdmin, handleLogout };
};

function App() {
  const { isAdmin, setIsAdmin, showAdmin, setShowAdmin, handleLogout } = useAdminState();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setShowAdmin]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
      
      {showAdmin ? (
        !isAdmin ? (
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Login 
              onLogin={() => setIsAdmin(true)} 
              onClose={() => setShowAdmin(false)}
            />
          </div>
        ) : (
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <AdminDashboard onLogout={handleLogout} setShowAdmin={setShowAdmin} />
          </div>
        )
      ) : (
        <Home onTriggerAdmin={() => setShowAdmin(true)} />
      )}
    </>
  );
}

export default App;
