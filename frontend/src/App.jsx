import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import Logout from './pages/Logout';
import { getToken } from './utils/auth';

const PrivateRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/register" />;
};

const App = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/my-sessions" element={<PrivateRoute><MySessions /></PrivateRoute>} />
    <Route path="/editor/:id?" element={<PrivateRoute><SessionEditor /></PrivateRoute>} />
    <Route path="/logout" element={<Logout />} />
    <Route
      path="/"
      element={getToken() ? <Navigate to="/my-sessions" /> : <Navigate to="/register" />}
    />
  </Routes>
);

export default App;
