import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Yahan par Appwrite se logout ka code aayega
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Todo App</div>
        <ul className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <li><Link to="/register" className="text-white hover:underline">Register</Link></li>
              <li><Link to="/login" className="text-white hover:underline">Login</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" className="text-white hover:underline">Dashboard</Link></li>
              <li><button onClick={handleLogout} className="text-white hover:underline">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

