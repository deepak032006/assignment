import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
    >
      🔓 Logout
    </button>
  );
}
