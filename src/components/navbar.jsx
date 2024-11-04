import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-4">
            <Link 
              to="/buildings"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/buildings')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              Buildings
            </Link>
            <Link 
              to="/rooms"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/rooms')
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              Rooms
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;